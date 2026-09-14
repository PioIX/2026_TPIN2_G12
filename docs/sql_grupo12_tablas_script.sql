create table if not exists Usuarios_tpi2(
	id_usuario int auto_increment unique NOT null,
    nombre varchar(255),
    mail varchar (255),
    contrasenia varchar(255),
    foto varchar(255),
    PRIMARY KEY(id_usuario)
);

create table if not exists Chats_tpi2(
	id_chat int auto_increment unique NOT null,
    nombre_chat varchar(255),
    foto varchar(255),
    PRIMARY KEY(id_chat)
);

create table if not exists Chats_por_usuario_tpi2(
	id_chats_usuario int auto_increment unique NOT null,
    id_usuario int,
    id_chat int,
    PRIMARY KEY(id_chats_usuario),
    FOREIGN KEY(id_usuario) REFERENCES Usuarios_tpi2(id_usuario),
    FOREIGN KEY(id_chat) REFERENCES Chats_tpi2(id_chat)
);

create table if not exists Mensajes_tpi2(
	id_mensaje int auto_increment unique NOT null,
    texto varchar(255),
    fecha datetime,
    id_chat int,
    id_usuario int,
    PRIMARY KEY(id_chats_usuario),
    FOREIGN KEY(id_chat) REFERENCES Chats_tpi2(id_chat),
    FOREIGN KEY(id_usuario) REFERENCES Usuarios_tpi2(id_usuario)
);

-- "2026-09-30 09:07:33"


INSERT INTO Usuarios_tpi2(nombre, mail, contrasenia, foto) VALUES
("a", "a@gmail.com", "1", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFsxV_At4mwe3e_-KE01usQMx2nujW0YfVe84Hhvhn8A&s=10"),
("b", "b@gmail.com", "f2", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-kId9q8TBrv7OYhl4T9L71ISg-PwmN_FPAthXTNQxkg&s");


INSERT INTO Chats_tpi2(nombre_chat, foto) VALUES
("chat a-b", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRujsgR07TcON7N8uPz4e6A4bHUA6pZKRE8dvXsQvK-2A&s=10");



 INSERT INTO Chats_por_usuario_tpi2(id_usuario, id_chat) VALUES
 (1, 1),
 (2, 1); 
 
 INSERT INTO Mensajes_tpi2(texto, fecha, id_chat, id_usuario) VALUES
 ("hola jaja", "2026-08-13 06:07:00", 1, 2);
 
