"use client"

const id_user = 2//parseInt(localStorage.getItem("id_user"))


import ChatList from "@/components/ChatList";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactosPage() {
    const router = useRouter()

    function clickChat(idChat) {
        console.log(idChat)
        localStorage.setItem("conv", idChat)
        router.push("/mensajes")
    }

    return (
        <>
            <h1>Contactos</h1>

            <ChatList id_log={id_user} botonOnClick={clickChat}></ChatList>
        </>
    )
}