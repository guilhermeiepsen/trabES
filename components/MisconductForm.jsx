// components/MisconductForm.js

"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function MisconductForm({ idEmployee }) {

    const employeeId = idEmployee;

    const [reporterId, setReporterId] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const report = {
                employeeId: String(employeeId), // Garantir que seja uma string
                reporterId: String(reporterId), // Garantir que seja uma string
                description: description
            };

            const res = await fetch('/api/misconduct', { // Endpoint da API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(report),
            });

            if (res.ok) {
                setStatus('Relatório de infração enviado com sucesso!');
                // Limpar os campos
                setReporterId('');
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
        <div className="flex flex-col gap-2 text-neutral-100 *:items-center *:px-4 *:tracking-wide">
            <h1 className="text-2xl font-bold mb-4">Enviar Relatório de Infração</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="employeeId" className="block text-sm font-medium text-neutral-400">ID do Funcionário</label>
                    <h2 className="text-lg flex justify-center">{employeeId}</h2>
                </div>
                <div>
                    <label htmlFor="reporterId" className="block text-sm font-medium text-neutral-400">Seu ID</label>
                    <input
                        id="reporterId"
                        type="text" // Alterado para text
                        value={reporterId}
                        onChange={(e) => setReporterId(e.target.value)}
                        className="border rounded px-2 py-1 text-black"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-neutral-400">Descrição</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded px-2 py-1 text-black"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Enviar Relatório
                </button>
            </form>
            {status && <p className="mt-4 text-lg">{status}</p>}
        </div>
    );
}
