"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddVacation() {
    
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [message, setMessage] = useState("");
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if(!name || !role) {
        //     alert('Título e descricao sao necessarios.');
        // }

        try {
            const vacation = {
                startDate: startDate,
                endDate: endDate,
                message: message
            };
            const res = await fetch('http://localhost:3000/api/vacations', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(vacation),
            });
            //depois que o topico eh criado vamos para a homepage

            if(res.ok) {
                router.push("/");
                router.refresh(); //dar um refresh para show up o topico criado
            } else {
                throw new Error("Failed to create a employee");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <form onSubmit={handleSubmit} //QUANDO O BUTTON DE SUBMIT EH CLICKADO CHAMA A FUNÇAO. SE OLHAR O BUTTON ELE TEM Q SER TYPE="SUBMIT"
            className="flex flex-col gap-2 *:bg-neutral-950 *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
                <label className="flex flex-col gap-2 *:bg-black *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
                    Data de Início: 
                    <input
                        onChange={(e) => setStartDate(e.target.value)} //ONCHANGE -- QUANDO MUDA O INPUT PEGA A STRING E BOTA NA VARIAVEL "e"
                        value={startDate}
                        type = "date"
                    />
                </label>
                <label className="flex flex-col gap-2 *:bg-black *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
                    Data de Fim: 
                    <input
                        onChange={(e) => setEndDate(e.target.value)} //ONCHANGE -- QUANDO MUDA O INPUT PEGA A STRING E BOTA NA VARIAVEL "e"
                        value={endDate}
                        type = "date"
                    />
                </label>
                 <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    type = "text"
                    placeholder="Messagem"
                    className="resize-none"
                    maxLength={140}
                />

                <button type="submit" className="hover:bg-neutral-800 font-bold
                text-white min-w-max">
                    Realizar Pedido
                </button>

    </form>
}