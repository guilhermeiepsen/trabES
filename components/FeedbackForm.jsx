"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
//import { getSession } from "@/middleware";


/*
export default function MyClientComponent() {
    const [session, setSession] = useState(null);
  
    useEffect(() => {
      async function fetchSession() {
        try {
          const response = await fetch('/api/session');
          const data = await response.json();
          setSession(data.session);
        } catch (error) {
          console.error('Failed to fetch session:', error);
        }
      }
  
      fetchSession();
    }, []);
*/

export default function FeedbackForm({ idEmployee }) {
    /*
    const [session, setSession] = useState(null);
  
    useEffect(() => {
      async function fetchSession() {
        try {
          const response = await fetch('http://localhost:3000/api/session/');
          const data = await response.json();
          setSession(data.session);
        } catch (error) {
          console.error('Failed to fetch session:', error);
        }
      }
  
      fetchSession();
    }, []);

    console.log(session);
    */

    //const session = getSession();
    //console.log(session);
    /*


    useEffect(() => {
        // Obtenha o cookie e verifique se ele é válido
        const cookies = cookie.parse(document.cookie);
        const sessionCookie = cookies.sessionCookie || ''; // Ajuste conforme necessário

        console.log(sessionCookie);
        setGiverId(sessionCookie);
    }, []);

    */
    
    const employeeId = idEmployee;
    //console.log(idEmployee);

export default function FeedbackForm({ id, name }) {
    
    const [giverId, setGiverId] = useState('');
    const [rate, setRate] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const feedback = {
                employeeId, // ID do funcionário
                giverId, // ID do avaliador
                rate: parseInt(rate, 10), // Avaliação (garantindo que é um número inteiro)
                message, // Mensagem do feedback
            };

            const res = await fetch('http://localhost:3000/api/feedback/', {
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
                //router.push('/');
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




/*
//import cookies from "js-cookie"

import { FeedbackForm } from './ClientFeedback'


export default function ServerFeedback( { id , giver} ) {

    // Server-side: based on HTTP resquest cookie only
    const employeeId = id;
    const giverId = giver;
    //const giverId = await cookies.get('user')?.value;
    return <FeedbackForm giverId={{ giverId , employeeId}} />
}

*/