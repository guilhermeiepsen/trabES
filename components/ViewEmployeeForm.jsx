"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ViewEmployeeForm({id, name, dateOfBirth, cpf, phoneNumber, corporateEmail, department, admissionDate, role, active}) {

    const [newName, setNewName] = useState(name);
    const [newAge, setNewAge] = useState(dateOfBirth);
    const [newCpf, setNewCpf] = useState(cpf);
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
    const [newCorporateEmail, setNewCorporateEmail] = useState(corporateEmail);
    const [newDepartment, setNewDepartment] = useState(department);
    const [newAdmissionDate, setNewAdmissionDate] = useState(admissionDate);
    const [newRole, setNewRole] = useState(role);
    const [newActive, setNewActive] = useState(active);
    var admission = new Date(newAdmissionDate);
    var birth = new Date(newAge);
    var today = new Date();
    var age = Math.abs(birth.getFullYear() - today.getFullYear());


    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({newName, newAge, newCpf, newPhoneNumber, newCorporateEmail, newDepartment, newAdmissionDate, newRole, newActive}),
            });

            if(!res.ok) {
                throw new Error("Erro ao editar tópico.");
            }

            
            router.push("/home");//"voltar um diretorio"
            router.refresh();
            

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col gap-2 text-neutral-100 *:items-center *:px-4 *:tracking-wide">
            
            <div className="flex gap-2">
                <p className="text-neutral-400 text-sm">Nome do funcionário: </p>
                <h2 className="text-lg">{newName}</h2>
            </div>
            <div className="flex gap-2">
                <p className="text-neutral-400 text-sm">Idade: </p>
                <h2 className="text-lg">{age} anos</h2>
            </div>
            <div className="flex gap-2">
                <p className="text-neutral-400 text-sm">Número de Telefone: </p>
                <h2 className="text-lg">{newPhoneNumber}</h2>
            </div>
            <div className="flex gap-2">
                <p className="text-neutral-400 text-sm">Departamento: </p>
                <h2 className="text-lg">{newDepartment}</h2>
            </div>
            <div className="flex gap-2">
                <p className="text-neutral-400 text-sm">Data de contratação: </p>
                <h2 className="text-lg">{admission.toLocaleDateString('pt-BR')}</h2>
            </div>
            <div className="flex gap-2">
                <p className="text-neutral-400 text-sm">Cargo: </p>
                <h2 className="text-lg">{newRole}</h2>
            </div>
            <div className="flex gap-2">
                <p className="text-neutral-400 text-sm">Situação: </p>
                <h2 className={active ? "text-lg text-green-300" : "text-lg"}>{active ? 'Ativo' : 'Inativo'}</h2>
            </div>
            <Link href="/" className="bg-neutral-950 hover:bg-neutral-800 rounded-lg px-4 py-2 self-center">Voltar</Link>
        </div>
    );
}