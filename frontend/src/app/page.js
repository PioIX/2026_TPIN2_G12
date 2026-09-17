"use client"

import { useState } from 'react';

export default function CondicionalTernario() {
  const [registrar, setRegistrar] = useState(false);

  return (
    <div>
      <button onClick={() => setRegistrar(false)}>Iniciar Sesión</button>
      <button onClick={() => setRegistrar(true)}>Registrarse</button>

      {registrar ? (
        <div>
          <h2>Registro</h2>
          <p>Complete los siguientes campos:</p>
          <input> Username</input>
          <input>Mail</input>
          <input>Password</input>
          <input>foto de contacto</input>

        </div>


      ) : (
        <div>
          <h2>Inicio de sesión</h2>
          <p>Ingrese sus datos: </p>

          <button onClick={() => setRegistrado(true)}>
            Registrarse
          </button>

        </div>
      )}
    </div>
  );
}