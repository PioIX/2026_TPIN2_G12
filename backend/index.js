

/*
var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');
const { Server } = require("socket.io");


var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 4000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
*/

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const sessionMiddleware = session({
  secret: "girasol",
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);

const server = app.listen(port, () => {
  console.log(`Servidor NodeJS corriendo en http://localhost:${port}/`);
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});



io.on("connection", (socket) => {
  const req = socket.request;
  let contador = 0;

  socket.on("joinRoom", (data) => {
    if (req.session.room != undefined && req.session.room.length > 0) {
      socket.leave(req.session.room);
    }
    req.session.room = data.room;
    socket.join(req.session.room);

    io.to(req.session.room).emit("chat-messages", {
      user: req.session.user,
      room: req.session.room,
    });
  });

  socket.on("pingAll", (data) => {
    console.log("PING ALL:", data);
    io.emit("pingAll", { event: "Ping to all", message: data });
  });

  socket.on("sendMessage", (data) => {
    io.to(req.session.room).emit("newMessage", {
      room: req.session.room,
      message: data.message,
    });
  });

  socket.on("eventoPersonalizado", () => {
    
    contador++;
    socket.emit("respuestaPersonalizada", { contador });
  });

  socket.on("disconnect", () => {
    console.log("Disconnect");
  });
});

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

//  ---------------- GETS GENERALES  --------------------------------
// Tablas:
// Chats_por_usuario_tpi2
// Chats_tpi2
// Usuarios_tpi2
// Mensajes_tpi2

app.get('/getUsuarios', async function(req,res){
    let respuesta = await realizarQuery("SELECT * FROM Usuarios_tpi2");  
    console.log({respuesta})  
    res.send(respuesta);
})

app.get('/getChats', async function(req,res){
    let respuesta = await realizarQuery("SELECT * FROM Chats_tpi2");    
    res.send(respuesta);
})

app.get('/getMensajes', async function(req,res){
    let respuesta = await realizarQuery("SELECT * FROM Mensajes_tpi2");    
    res.send(respuesta);
})

app.get('/getChatsPorUsuario', async function(req,res){
    let respuesta = await realizarQuery("SELECT * FROM Chats_por_usuario_tpi2");    
    res.send(respuesta);
})







//   ---------------  REGISTRO Y LOGIN  --------------------------

app.post('/register', async function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    let respuesta =  await realizarQuery(`
        Select  *  From Usuarios_tpi2
        Where nombre = "${req.body.nombre}"
        `)
    if (respuesta.length == 0) {
       await realizarQuery(`
        INSERT INTO Usuarios_tpi2(nombre, mail, contrasenia, foto) VALUES 
        ("${req.body.nombre}","${req.body.mail}","${req.body.contrasenia}", "${req.body.foto}")
    `)
        let respuesta2 = await realizarQuery(`SELECT id_usuario FROM Usuarios_tpi2 WHERE nombre="${req.body.nombre}"`)
        res.send({mensaje: "Usuario agregado", ok: true, id_user: respuesta2[0].id_usuario}) 
    } else {
        res.send({mensaje: "Este dato ya existe", ok: false})
    } 
})


//sin terminaR

app.post('/login', async function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    let respuesta =  await realizarQuery(`
        Select  *  From Usuarios_tpi2
        Where nombre = "${req.body.nombre}" AND contrasenia = "${req.body.contrasenia}"
        `)
    if (respuesta.length == 0) {

        res.send({mensaje: "algo incorrecto"}) 
    } else {
        res.send({mensaje: "Este dato ya existe", ok: false})
    } 
})




// historial

app.get('/getchatsdeusuario', async function(req,res){
    let respuesta = await realizarQuery(`
        SELECT nombre_chat FROM Chats_tpi2
        INNER JOIN Chats_por_usuario_tpi2 ON Chats_por_usuario_tpi2.id_chat = Chats_tpi2.id_chat
        INNER JOIN Usuarios_tpi2 ON Usuarios_tpi2.id_usuario = Chats_por_usuario_tpi2.id_usuario
        WHERE Usuarios_tpi2.id_usuario = ${req.body.id_usuario};
        `);    
    res.send(respuesta);
})

app.get('/gethistorialchat', async function(req,res){
    let respuesta = await realizarQuery(`
        SELECT texto, fecha, nombre, Usuarios_tpi2.id_usuario FROM Mensajes_tpi2
        INNER JOIN Chats_tpi2 ON Chats_tpi2.id_chat = Mensajes_tpi2.id_chat
        INNER JOIN Usuarios_tpi2 ON Usuarios_tpi2.id_usuario = Mensajes_tpi2.id_usuario
        WHERE Mensajes_tpi2.id_chat = ${req.body.id_chat};
        `);    
    res.send(respuesta);
})