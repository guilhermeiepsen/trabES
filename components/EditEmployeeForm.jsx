"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditEmployeeForm({id, name, phoneNumber, corporateEmail, department, role, active}) {

    const [newName, setNewName] = useState(name);
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
    const [newCorporateEmail, setNewCorporateEmail] = useState(corporateEmail);
    const [newDepartment, setNewDepartment] = useState(department);
    const [newRole, setNewRole] = useState(role);
    const [newActive, setNewActive] = useState(active);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/employees/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({newName, newPhoneNumber, newCorporateEmail, newDepartment, newRole, newActive}),
            });

            if(!res.ok) {
                throw new Error("Erro ao editar tópico.");
            }

            
            router.push("/");//"voltar um diretorio"
            router.refresh();
            

        } catch (error) {
            console.log(error);
        }
    };

    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 *:bg-neutral-950 *:px-4 *:py-2 *:rounded-lg *:text-neutral-200" >
        <input 
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            type = "text"
            placeholder="Nome"
        />
        <input 
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            value={newPhoneNumber}
            type = "number"
            placeholder="Número de Telefone"
        />
        <input
            onChange={(e) => setNewCorporateEmail(e.target.value)}
            value={newCorporateEmail} 
            type = "email"
            placeholder="Email Corporativo"
        />
        <input 
            onChange={(e) => setNewDepartment(e.target.value)}
            value={newDepartment}
            type = "text"
            placeholder="Departamento"
        />
        <input 
            onChange={(e) => setNewRole(e.target.value)}
            value={newRole}
            type = "text"
            placeholder="Cargo"
        />

        <button type= "submit" className="font-bold
        text-white min-w-max">
            Salvar
        </button>

    </form>
    );
}