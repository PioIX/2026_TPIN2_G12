"use client"

import {useSocket} from "@/hooks/useSocket";
import { useEffect } from "react";
import { useState } from "react";

export default function SocketPage() {

    const { socket, isConnected } = useSocket();
    const [mensaje, setMensaje] = useState([])
    const [contador, setContador] = useState(0) 


    useEffect(() => {
        if (!socket) return;
        //Aquí entrará cuando reciba un evento
        if (isConnected) {
            console.log("conectado")
        }

        socket.on("respuestaPersonalizada", (data) => {
            setContador(data.contador);
        });

        socket.on("newMessage", (data) => {
            console.log(data);
            
        });

        socket.on("pingAll", (data) => {
            console.log(data);
            setMensaje((prev) => [...prev, data.message.msg])
        });
    
}, [socket]);

    useEffect(() => {
            if (!socket) return;
            //Aquí entrará cuando reciba un evento
            if (isConnected) {
                console.log("conectado")
                socket.emit("joinRoom", {room: 1})
            }        
    }, [isConnected]);


    useEffect(()=>{
        console.log(mensaje)
    }, [mensaje])


    function pingAll() {
        socket.emit("pingAll", { msg: "Hola desde mi compu" });
        }

    function sumarUno() {
        socket.emit("sendMessage", {message: "hola", room: 1})
    }

        

        

    return (
        <>
             {isConnected ? (
                <p>🟢 Conectado al servidor</p>
             ) : (
                <p>🔴 Desconectado</p>
             )}


             <button onClick={pingAll}>
                Enviar ping a todos
            </button>

            <button onClick={sumarUno}>
                prueba
            </button>

            
            {mensaje.map((texto, index) =>  <p key={index}> mensaje numero: {index + 1}: {texto}</p>)}

            <p> Contador: {contador}</p>
        </>
    )
}
