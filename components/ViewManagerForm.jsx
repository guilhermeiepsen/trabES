"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ViewManagerForm({ id, name, department, role, userType }) {
    const [newName] = useState(name);
    const [newDepartment] = useState(department);
    const [newRole] = useState(role);

    const router = useRouter();

    if(userType==1)
        userType = 2;
    else
        userType = 1;

    const handlePromotion = async (e) => {
        e.preventDefault();
        // Lógica para promover o funcionário
        try {
            const res = await fetch(`http://localhost:3000/api/manager/${id}?type=${userType}`, {
                method: "POST",
            });

            if (!res.ok) {
                throw new Error("Failed to promote employee");
            }

            const data = await res.json();
            router.push('/employeesList');
            router.refresh();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex flex-col gap-2 text-neutral-100 *:items-center *:px-4 *:tracking-wide">
            <Link href="/home" className="bg-neutral-950 hover:bg-neutral-800 rounded-lg px-4 py-2 max-w-fit text-neutral-400">
              Voltar
            </Link>
            <div className="flex gap-2">
                <p className="text-neutral-400 text-sm">Nome do funcionário: </p>
                <h2 className="text-lg">{newName}</h2>
            </div>
            <div className="flex gap-2">
                <p className="text-neutral-400 text-sm">Tipo de usuário atual: </p>
                <h2 className="text-lg">{userType == 2 ? 'Gerente' : 'Funcionário'}</h2>
            </div>
            <div className="flex gap-2">
                <p className="text-neutral-400 text-sm">Departamento: </p>
                <h2 className="text-lg">{newDepartment}</h2>
            </div>
            <div className="flex gap-2">
                <p className="text-neutral-400 text-sm">Cargo: </p>
                <h2 className="text-lg">{newRole}</h2>
            </div>
            <button
                onClick={handlePromotion}
                className="bg-neutral-950 hover:bg-neutral-800 rounded-lg px-4 py-2 self-center"
            >
                {userType == 2 ? 'Rebaixar a funcionário' : 'Promover a Gerente'}
            </button>
           </div>
    );
}
