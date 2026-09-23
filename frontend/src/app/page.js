"use client"

import { useState } from 'react';
import Button from './componentes/Button';
import Input from './componentes/Input';


export default function HomePage() {
  const [registrar, setRegistrar] = useState(false);

  function getMail() {
    return document.getElementById("mail").value;
  }
  function getContra() {
    return document.getElementById("contraseña").value;
  }
  function getUsu() {
    return document.getElementById("username").value;
  }
  function getFoto() {
    return document.getElementById("fotoContacto").value;
  }


  async function iniciarSesion() {
    let mail = getMail()
    let contrasenia = getContra()

    let response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mail, contrasenia })
    })

    let res = await response.json()

    if (mail == "" || contrasenia == "") {
      alert("Todos los campos deben estar completos")
    } if (res.ok == true) {
      id_user = res.id_user
      localStorage.setItem("id_user", id_user)
    } else {
      alert("Usuario o contraseña incorrectos")
    }

  }

  async function crearCuenta() {
    let mail = getMail()
    let contrasenia = getContra()
    let nombre = getUsu()
    let foto = getFoto()

    let response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, mail, contrasenia, foto })
    })
    let res = await response.json()

    if (nombre == "" || mail == "" || contrasenia == "" || foto == "") {
      alert("Todos los campos deben estar completos")
    } if (res.ok == true) {
      id_user = res.id_user
      localStorage.setItem("id_user", id_user)
    } else {
      alert("Ya existe la cuenta")
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Seleccione: </p>

      <Button text="Iniciar Sesion" onClick={() => setRegistrar(false)}></Button>
      <Button text="Registrarse" onClick={() => setRegistrar(true)}></Button>

      {registrar ? (
        <div>
          <h2>Registro</h2>
          <p>Complete los siguientes campos:</p>

          {/* <Input placeholder="Ej: Sayu.Crack" id="username"></Input>

          <Input placeholder="Ej: Sayu.Crack" id="username" onChange={getUsu()}></Input> */}


          <Input placeholder="sayu@gmail.com" id="mail"></Input>
          <Input placeholder="papita123" id="contraseña"></Input>
          <Input id="fotoContacto" placeholder="link">  </Input>

          <Button text="Validar" onClick={crearCuenta()}></Button>
        </div>


      ) : (
        <div>
          <h2>Inicio de sesión</h2>
          <p>Ingrese sus datos: </p>

          <Input placeholder="sayu@gmail.com" id="mail"></Input>
          <Input placeholder="papita123" id="contraseña"></Input>

          <Button text="Validar" onClick={iniciarSesion()}></Button>
        </div>
      )}
    </div>
  );
}