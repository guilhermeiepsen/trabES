"use client"; //TORNAR COMPONENTE CLIENTE (P INTERAÇÃO COM O CLIENTE NA PAGINA E NÃO NO SERVIDOR) 

import { HiCheck } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function ApproveVacation({ id }) {

    const router = useRouter();
    const approveVacation = async() => {
        const confirmed = confirm("Voce tem certeza que deseja aprovar o pedido?");

        if(confirmed) {
            const res = await fetch(`http://localhost:3000/api/vacations?id=${id}`, { method: "PUT" });
            //PARA NÃO PRECISAR DAR UM REFRESH NA PAGINA APÓS DELETAR O TÓPICO FAÇA O REFRESH NO PROXIMO IF STATEMENT:
            if (res.ok) {
                router.refresh();
            }
        }
    }

    return (
    <button onClick={approveVacation} className="">
        <HiCheck size={24} />
    </button>
    );
}