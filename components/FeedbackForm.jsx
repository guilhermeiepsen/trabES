"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedbackForm({ id, giverId }) {
    const [userId] = useState(giverId);
    const [employeeId] = useState(id);

    const [rate, setRate] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const feedback = {
            giverId: userId,
            rate,
            message
        };

        try {
            const res = await fetch(`/api/feedback/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedback),
            });

            console.log(res);
            if (res.ok) {
                setStatus('Feedback enviado com sucesso!');
                setRate('');
                setMessage('');
            } else {
                setStatus('Erro ao enviar feedback.');
            }
        } catch (error) {
            setStatus('Erro ao enviar feedback.');
        }
    };
    

    return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 *:bg-neutral-950 *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
            <h1 className="text-2xl font-bold">Enviar Feedback</h1>
                {/* <div>
                    <label htmlFor="employeeId" className="block text-sm font-medium text-neutral-400">ID do Funcionário</label>
                    <h2 className="text-lg flex justify-center">{employeeId}</h2>
                </div>
                <div>
                    <label htmlFor="giverId" className="block text-sm font-medium text-neutral-400">Seu ID</label>
                    <h2 className="text-lg flex justify-center">{userId}</h2>
                </div> */}
                <label className="flex flex-col gap-2 *:bg-black *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
                    Avaliação (0-10)
                    <input
                        id="rate"
                        onChange={(e) => setRate(e.target.value)} //ONCHANGE -- QUANDO MUDA O INPUT PEGA A STRING E BOTA NA VARIAVEL "e"
                        value={rate}
                        type = "number"
                        min="0"
                        max="10"
                        required
                    />
                </label>
                <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    type = "text"
                    placeholder="Messagem"
                    className="resize-none"
                    maxLength={140}
                    required
                />
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
