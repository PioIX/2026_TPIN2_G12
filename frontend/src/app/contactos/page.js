"use client"

const id_user = localStorage.getItem("id_user")


import ChatList from "@/components/ChatList";
import { useEffect } from "react";
import { useState } from "react";

export default function ContactosPage() {

    function clickChat(idChat) {
        console.log(idChat)
    }

    return (
        <>
            <h1>Contactos</h1>

            <ChatList id_log={id_user} botonOnClick={clickChat}></ChatList>
        </>
    )
}