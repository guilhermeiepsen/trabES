"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedbackForm({ idEmployee }) {
    
    const employeeId = idEmployee;
    console.log(employeeId);
    const [giverId, setGiverId] = useState('');
    
    const [rate, setRate] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const feedback = {
                employeeId: String(employeeId),
                giverId: String(giverId),
                rate: parseInt(rate, 10),
                message,
            };
    
            console.log('Enviando feedback:', feedback); // Adicione este log para verificar o feedback enviado
    
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedback),
            });
    
            const data = await res.json(); // Obtenha a resposta JSON para mais detalhes
            if (res.ok) {
                setStatus('Feedback enviado com sucesso!');
                setGiverId('');
                setRate('');
                setMessage('');
                router.refresh();
            } else {
                console.error('Resposta da API:', data); // Adicione este log para verificar a resposta da API
                throw new Error(data.error || 'Erro ao enviar feedback.');
            }
        } catch (error) {
            console.error('Erro no handleSubmit:', error);
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
                    <label htmlFor="giverId" className="block text-sm font-medium text-neutral-400">Seu Id (0-5)</label>
                    <input
                        id="giverId"
                        type="number"
                        value={giverId}
                        onChange={(e) => setGiverId(e.target.value)}
                        className="border rounded px-2 py-1 text-black"
                        min="0"
                        max="5"
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
                        max="10"
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
