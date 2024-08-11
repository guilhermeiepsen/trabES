"use client"; //TORNAR COMPONENTE CLIENTE (P INTERAÇÃO COM O CLIENTE NA PAGINA E NÃO NO SERVIDOR) 

import { HiTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveUser({ id }) {

    const router = useRouter();
    const removeTopic = async() => {
        const confirmed = confirm("Voce tem certeza que deseja remover o tópico?");

        if(confirmed) {
            const res = await fetch(`http://localhost:3000/api/employees?id=${id}`, { method: "DELETE" });
            //PARA NÃO PRECISAR DAR UM REFRESH NA PAGINA APÓS DELETAR O TÓPICO FAÇA O REFRESH NO PROXIMO IF STATEMENT:
            if (res.ok) {
                router.refresh();
            }
        }
    }

    return (
    <button onClick={removeTopic} className="text-red-400">
        <HiTrash size={24} />
    </button>
    );
}