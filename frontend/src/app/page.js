"use client"

import { useState } from 'react';

export default function CondicionalTernario() {
  const [registrado, setRegistrado] = useState(false);
  return (
    <div>
      {registrado ? (
        <div>
          <h2>¡Bienvenido!</h2>
          <p>Estás registrado en el sistema</p>
          <button onClick={() => setRegistrado(false)}>
            Cerrar Sesión
          </button>
        </div>


      ) : (
        <div>
          <h2>Registro</h2>
          <p>Por favor, registrese en el sistema</p>

          <button onClick={() => setRegistrado(true)}>
            Registrarse
          </button>

        </div>
      )}
    </div>
  );
}