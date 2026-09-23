"use client"
export default function Input({idInput, text}) {
    return (
        <input id={idInput} placeholder={text} type="text"> </input>
    )
}