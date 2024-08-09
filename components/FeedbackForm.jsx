"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedbackForm({ id, name }) {
    const [employeeId] = id;
    const [giverId, setGiverId] = useState('');
    const [rate, setRate] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const feedback = {
                employeeId: employeeId, // ID do funcionário
                giverId: giverId, // ID do avaliador
                rate: parseInt(rate, 10), // Avaliação (garantindo que é um número inteiro)
                message: message, // Mensagem do feedback
            };

            const res = await fetch('http://localhost:3000/api/employees/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedback),
            });

            if (res.ok) {
                setStatus('Feedback enviado com sucesso!');
                // Limpar os campos
                setGiverId('');
                setRate('');
                setMessage('');
                
                // Redirecionar para a página inicial ou outra página
                router.push('/');
                router.refresh(); // Atualiza a página
            } else {
                throw new Error('Erro ao enviar feedback.');
            }
        } catch (error) {
            console.error(error);
            setStatus('Erro ao enviar feedback.');
        }
    };

    return (
        <div className="flex flex-col gap-2 text-neutral-100 *:items-center *:px-4 *:tracking-wide">
            <h1 className="text-2xl font-bold mb-4">Enviar Feedback</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="employeeId" className="block text-sm font-medium text-neutral-400">ID do Funcionário</label>
                    <h2 className="text-lg flex justify-center">{employeeId}</h2>
                </div>
                <div>
                    <label htmlFor="giverId" className="block text-sm font-medium text-neutral-400">Seu ID</label>
                    <input
                        id="giverId"
                        type="number"
                        value={giverId}
                        onChange={(e) => setGiverId(e.target.value)}
                        className="border rounded px-2 py-1 text-black"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rate" className="block text-sm font-medium text-neutral-400">Avaliação (0-5)</label>
                    <input
                        id="rate"
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="border rounded px-2 py-1 text-black"
                        min="0"
                        max="5"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-400">Mensagem</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border rounded px-2 py-1 text-black"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Enviar Feedback
                </button>
            </form>
            {status && <p className="mt-4 text-lg">{status}</p>}
        </div>
    );
}
