"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ViewManagerForm({ id, name, department, role }) {
    const [newName] = useState(name);
    const [newDepartment] = useState(department);
    const [newRole] = useState(role);

    const router = useRouter();

    const handlePromotion = async (e) => {
        e.preventDefault();
        // Lógica para promover o funcionário
        try {
            const res = await fetch(`http://localhost:3000/api/manager/${id}`, {
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
            <div className="flex gap-2">
                <p className="text-neutral-400 text-sm">Nome do funcionário: </p>
                <h2 className="text-lg">{newName}</h2>
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
                disabled={newRole === 'Gerente'}
            >
                {newRole !== 'Gerente' ? 'Promover a Gerente' : 'Funcionário já é Gerente'}
            </button>
           </div>
    );
}
