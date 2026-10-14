"use client"

import PopUp from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ChatList from "@/components/ChatList";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { mail } from '@/app/page.js';


export default function ContactosPage() {
    
    const router = useRouter()
    const searchParams = useSearchParams()
    const id_user = 2//parseInt(searchParams.get("id_user"))
    const [popupOpenChat, setpopupOpenChat] = useState(false)
    const [popupOpenGrupo, setpopupOpenGrupo] = useState(false)
    const [mail, setMail] = useState("")
    const [error, setError] = useState("")

    function clickChat(idChat) {
        console.log(idChat)
        console.log("usuario "+id_user)
        router.push("/mensajes?conv="+idChat+"&user="+id_user)
    }

    async function nuevoChat() {
    if (mail() === "") {
        setError("Ingrese un mail");
        return;
    }
        const response = await fetch("http://localhost:4000/contactos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_user,
                mail: mail
            })
        });

        const res = await response.json();

        if (res.ok === true) {
            setError("");
            setMail("");
            setpopupOpenChat(false);
            alert("se creo el chat");
        } else {
            setError(res.error || "error al crear el chat");
        };
    }
    


//------------------------------------------------------------------------------------------------//

    async function nuevoGrupo() {
    if (
        nombreGrupo() === "" ||
        mailsGrupo() === ""
    ) {
        setError("Ingrese el nombre del grupo y los mails");
        return;
    }

    const mails = mailsGrupo
        .split(",")
        .map(mail => mail.trim());

     {
        const response = await fetch("http://localhost:4000/contactos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_user,
                nombre: nombreGrupo.trim(),
                mails,
                foto: fotoGrupo
            })
        });

        const res = await response.json();

        if (res.ok === true) {
            setpopupOpenGrupo(false);
            alert("Se creo el grupo");
        } else {
            setError(res.error || "error al crear el grupo");
        }
    }
}

    return (
        <>
            <h1>Contactos</h1>

        <ChatList id_log={id_user} botonOnClick={clickChat} />

        <button onClick={() => setpopupOpenChat(true)}>Nuevo chat</button>
        <button onClick={() => setpopupOpenGrupo(true)}>Nuevo grupo</button>

        <Popup open={popupOpenChat} onClose={() => setpopupOpenChat(false)} modal>
            <h2>Crear chat</h2>
            <input placeholder="mail del usuario" value={mail} onChange={(e) => setMail(e.target.value)} />
            <p>{errorChat}</p>
            <button onClick={nuevoChat}>Crear</button>
        </Popup>

        <Popup open={popupOpenGrupo} onClose={() => setpopupOpenGrupo(false)} modal>
        <h2>Crear grupo</h2>
            <input placeholder="nombre del grupo" value={nombreGrupo} onChange={(e) => setNombreGrupo(e.target.value)} />
            <input placeholder="mails separados por comas" value={mailsGrupo} onChange={(e) => setMailsGrupo(e.target.value)} />
            <input placeholder="link de la foto" value={fotoGrupo} onChange={(e) => setFotoGrupo(e.target.value)} />
            <p>{errorGrupo}</p>
            <button onClick={nuevoGrupo}>Crear grupo</button>
        </Popup>
        </>

   );
 }