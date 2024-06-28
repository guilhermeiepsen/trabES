"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
    
    const [title, setTitle] = useState("");
    const[description, setDescription] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title || !description) {
            alert('Título e descricao sao necessarios.')
        }

        try {
            const res = await fetch('http://localhost:3000/api/topics', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });
            //depois que o topico eh criado vamos para a homepage

            if(res.ok) {
                router.push("/");
                router.refresh(); //dar um refresh para show up o topico criado
            } else {
                throw new Error("Failed to create a topic");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <form onSubmit={handleSubmit} //QUANDO O BUTTON DE SUBMIT EH CLICKADO CHAMA A FUNÇAO. SE OLHAR O BUTTON ELE TEM Q SER TYPE="SUBMIT"
            className="flex flex-col gap-2">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="border border-slate-500 px-8 py-2"
                    type = "text"
                    placeholder="Título"
                />

                <input
                    onChange={(e) => setDescription(e.target.value)} //ONCHANGE -- QUANDO MUDA O INPUT PEGA A STRING E BOTA NA VARIAVEL "e"
                    value={description}
                    className="border border-slate-500 px-8 py-2"
                    type = "text"
                    placeholder="Descrição"
                />

                <button type="submit" className="bg-green-600 font-bold
                text-white py-3 px-6 w-fit">
                    Adicionar tópico
                </button>

    </form>
}