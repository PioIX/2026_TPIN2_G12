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
    PRIMARY KEY(id_chats_usuario),
    FOREIGN KEY(id_usuario) REFERENCES Usuarios_tpi2(id_usuario),
    FOREIGN KEY(id_chat) REFERENCES Chats_tpi2(id_chat)
);

create table if not exists Mensajes_tpi2(
	id_mensaje int auto_increment unique NOT null,
    texto varchar(255),
    fecha datetime,
    PRIMARY KEY(id_chats_usuario),
    FOREIGN KEY(id_chat) REFERENCES Chats_tpi2(id_chat),
    FOREIGN KEY(id_usuario) REFERENCES Usuarios_tpi2(id_usuario)
);


INSERT INTO Usuarios_tpi2(nombre, mail, contrasenia, foto
