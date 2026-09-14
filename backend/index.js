var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 4000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
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

app.post('/login', async function(req,res) {
    console.log(req.body) 
    let respuesta =  await realizarQuery(`
        Select  *  From Usuarios_tpi2
        Where nombre = "${req.body.nombre}" AND contrasenia = "${req.body.contrasenia}"
        `)
    if (respuesta.length == 0) {
        res.send({mensaje: "No se encontró el usuario ingresado"}) 
    } else {
        res.send({mensaje: "Usuario encontrado"})
    } 
})

// creacion de un chat de a 2
app.post('/chatnuevo', async function(req,res) {
    console.log(req.body) 
    let respuesta =  await realizarQuery(`
        Select  id_usuario  From Usuarios_tpi2
        Where mail = "${req.body.mail}"
        `)
    if (respuesta.length == 0) {
       await realizarQuery(`
        INSERT INTO Chats_tpi2(nombre_chat, foto) VALUES 
        ("${req.body.nombre_chat}", "${req.body.foto}")

        INSERT INTO Chats_por_usuario_tpi2(id_usuario, id_conversacion) VALUES 
        ("${req.body.nombre_chat}", "${req.body.foto}")
    `)
        let respuesta2 = await realizarQuery(`SELECT id_usuario FROM Usuarios_tpi2 WHERE nombre="${req.body.nombre}"`)
        res.send({mensaje: "Usuario agregado", ok: true, id_user: respuesta2[0].id_usuario}) 
    } else {
        res.send({mensaje: "Este dato ya existe", ok: false})
    } 
})
