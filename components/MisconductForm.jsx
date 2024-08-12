// components/MisconductForm.js

"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function MisconductForm({ idEmployee, giverId }) {

    const [idLogado] = useState(giverId);

    const [idEm] = useState(idEmployee);

    //const reporterId = giverId;
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const report = {
                employeeId: idEm,
                reporterId: idLogado, 
                description: description
            };

            const res = await fetch('http://localhost:3000/api/misconduct', { // Endpoint da API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(report),
            });

            if (res.ok) {
                setStatus('Denúncia enviada com sucesso!');
                // Limpar os campos
                //setReporterId('');
                setDescription('');
            
                router.refresh(); // Atualiza a página
            } else {
                throw new Error('Erro ao enviar relatório de infração.');
            }
        } catch (error) {
            console.error(error);
            setStatus('Erro ao enviar relatório de infração.');
        }
    };

    return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 *:bg-neutral-950 *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
            <h1 className="text-2xl font-bold">Enviar Ticket de Denúncia</h1>
                {/* <div>
                    <label htmlFor="employeeId" className="block text-sm font-medium text-neutral-400">ID do Funcionário</label>
                    <h2 className="text-lg flex justify-center">{idEm}</h2>
                </div>
                <div>
                    <label htmlFor="reporterId" className="block text-sm font-medium text-neutral-400">Seu ID</label>
                    <h2 className="text-lg flex justify-center">{idLogado}</h2>
                </div> */}
                <label className="flex flex-col gap-2 *:bg-black *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
                    Descrição
                    <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type = "text"
                    className="resize-none"
                    maxLength={140}
                    required
                />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Enviar
                </button>
                {status && <p className="mt-4 text-lg">{status}</p>}
            </form> 
    );
}
