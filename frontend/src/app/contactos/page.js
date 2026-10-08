"use client"



import PopUp from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ChatList from "@/components/ChatList";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import getMail from "@/mensajes/page.js";
import { Mali } from 'next/font/google';

export default function ContactosPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const id_user = 2//parseInt(searchParams.get("id_user"))
    const [popupOpenChat, setpopupOpenChat] = useState(false)
    const [popupOpenGrupo, setpopupOpenGrupo] = useState(false)

    function clickChat(idChat) {
        console.log(idChat)
        console.log("usuario "+id_user)
        router.push("/mensajes?conv="+idChat+"&user="+id_user)
    }

    //seguir investigando popUp

    function nuevoChat(){
        if(getMail = "" || getMail = null) {
        verificar = false
        } else   {
        verificar = true
    }
        
    

    function nuevoGrupo(){
        const hola = 1
    }

    return (
        <>
            <h1>Contactos</h1>

            <ChatList id_log={id_user} botonOnClick={clickChat}></ChatList>

            <button onClick={() => setpopupOpenChat(true)}>Open dialog</button>
             <PopUp popupOpenChat={popupOpenChat} closePopUp={()=>setpopupOpenChat(false)}>
                <h1>Crear chat</h1>
                <h2>Ingrese el mail</h2>
                <input id={idInput} placeholder={text} type="text" onChange={onChange}></input>
                <button onClick={() =>(setpopupOpenChat(false))}> </button>
            </PopUp>

            <button onClick={() => setpopupOpenGrupo(true)}>Open dialog</button>
            <PopUp popupOpenChat={popupOpenChat} closePopUp={()=>setpopupOpenChat(false)}>
                <h1>Crear grupo</h1>
                <h2>Ingrese los mails</h2>
                <input id={idInput} placeholder={text} type="text" onChange={onChange}></input>
                <button onClick={() =>(setpopupOpenGrupo(false))}> </button>
            </PopUp>


        </>
    )
}