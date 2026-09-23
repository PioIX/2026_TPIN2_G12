"use client"

import { useState } from 'react';
import Button from './componentes/Button';

export default function HomePage() {
  const [registrar, setRegistrar] = useState(false);

  function iniciarSesion() {


  }

  function crearCuenta() {

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

          <Input placeholder="Ej: Sayu.Crack" id="username"></Input>

          <Input placeholder="sayu@gmail.com" id= "mail"></Input>
          <Input placeholder="papita123" id="contraseña"></Input>
          <Input id="fotoContacto" placeholder="ahsdpahsdpaishdp">  </Input>

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