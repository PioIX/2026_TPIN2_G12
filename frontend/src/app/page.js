"use client"

import { useState } from 'react';
import Button from './componentes/Button';
import Input from './componentes/Input';


export default function HomePage() {
  let id_user = -1
  const [registrar, setRegistrar] = useState(false);

  const [foto, setFoto] = useState("");
  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [usu, setUsu] = useState("");


  const getFoto = (event) => {setFoto(event.target.value)}
  const getMail = (event) => {setMail(event.target.value)}
  const getContrasenia = (event) => {setContrasenia(event.target.value)}
  const getUsu = (event) => {setUsu(event.target.value)}

  async function iniciarSesion() {
    if (mail == "" || contrasenia == "") {
      alert("Todos los campos deben estar completos")
    } else {
      let response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, contrasenia })
      })

      let res = await response.json()

      if (res.ok == true) {
        id_user = res.id_user
        localStorage.setItem("id_user", id_user)
      } else {
        alert("Usuario o contraseña incorrectos")
      }
    }
  }

  async function crearCuenta() {

    if (usu == "" || mail == "" || contrasenia == "" || foto == "") {
      alert("Todos los campos deben estar completos")
    } else {

      let response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usu, mail, contrasenia, foto })
      })
      let res = await response.json()

      if (res.ok == true) {
        id_user = res.id_user
        localStorage.setItem("id_user", id_user)
      } else {
        alert("Ya existe la cuenta")
      }
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

          <Input text="Ej: Sayu.Crack" id="username" onChange={getUsu}></Input>
          <Input text="sayu@gmail.com" id="mail" onChange={getMail}></Input>
          <Input text="papita123" id="contraseña" onChange={getContrasenia}></Input>
          <Input id="fotoContacto" text="link" onChange={getFoto}></Input>

          <Button text="Validar" onClick={crearCuenta}></Button>
        </div>


      ) : (
        <div>
          <h2>Inicio de sesión</h2>
          <p>Ingrese sus datos: </p>

          <Input text="sayu@gmail.com" id="mail" onChange={getMail}></Input>
          <Input text="papita123" id="contraseña" onChange={getContrasenia}></Input>

          <Button text="Validar" onClick={iniciarSesion}></Button>
        </div>
      )}
    </div>
  );
}