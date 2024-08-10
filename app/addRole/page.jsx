"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function addManager() {
    
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    // const [cpf, setCpf] = useState("");
    // const [phoneNumber, setPhoneNumber] = useState("");
    // const [corporateEmail, setCorporateEmail] = useState("");
    const [department, setDepartment] = useState("");
    // const [admissionDate, setAdmissionDate] = useState();
    const [role, setRole] = useState("");
    // const [active, setActive] = useState(1);
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newManager = {
                name: name,
                age: age,
                department: department,
                role: role,
            };
            const res = await fetch('http://localhost:3000/api/manager', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(newManager),
            });
            //depois que o topico eh criado vamos para a homepage
            await res.json();
            if(res.ok) {
                router.push("/");
                router.refresh(); //dar um refresh para show up o topico criado
            } else {
                throw new Error("Failed to promote to manager");
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
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                    type = "text"
                    placeholder="Idade"
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