"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
    
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [corporateEmail, setCorporateEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");
    const [active, setActive] = useState(1);
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if(!name || !role) {
        //     alert('Título e descricao sao necessarios.');
        // }

        try {
            const employee = {
                name: name,
                cpf: cpf,
                phoneNumber: phoneNumber,
                corporateEmail: corporateEmail,
                department: department,
                role: role,
                active: active,
            };
            const res = await fetch('http://localhost:3000/api/topics', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(employee),
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
            className="flex flex-col gap-2 *:bg-neutral-950 *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type = "text"
                    placeholder="Nome"
                />
                <input
                    onChange={(e) => setCpf(e.target.value)}
                    value={cpf}
                    type = "number"
                    placeholder="CPF"
                />
                <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    type = "number"
                    placeholder="Número de Telefone"
                />
                <input
                    onChange={(e) => setCorporateEmail(e.target.value)} //ONCHANGE -- QUANDO MUDA O INPUT PEGA A STRING E BOTA NA VARIAVEL "e"
                    value={corporateEmail}
                    type = "email"
                    placeholder="Email Corporativo"
                />
                <input
                    onChange={(e) => setDepartment(e.target.value)} //ONCHANGE -- QUANDO MUDA O INPUT PEGA A STRING E BOTA NA VARIAVEL "e"
                    value={department}
                    type = "text"
                    placeholder="Departamento"
                />
                <input
                    onChange={(e) => setRole(e.target.value)} //ONCHANGE -- QUANDO MUDA O INPUT PEGA A STRING E BOTA NA VARIAVEL "e"
                    value={role}
                    type = "text"
                    placeholder="Cargo"
                />

                <button type="submit" className="hover:bg-neutral-800 font-bold
                text-white min-w-max">
                    Registrar Funcionário
                </button>

    </form>
}