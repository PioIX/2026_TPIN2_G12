"use client"

export default function Message({ mensaje, propio }) {
    return (
        <div className={propio ? "mensajePropio" : "mensajeUsuario"}>
            <p>{mensaje.message}</p>
        </div>
    );
}