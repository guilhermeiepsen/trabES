// pages/feedbacks/index.js
import Link from 'next/link';
import { cookies } from "next/headers";

const getFeedbacks = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/feedback/`, {
        METHOD: 'GET',
        cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch feedbacks');
    }
    return res.json();
  } catch (error) {
    console.error('Error loading feedbacks:', error);
    return [];
  }
};

export default async function FeedbackList() {

    const employeeId = cookies().get('user');
    const feedbacks = await getFeedbacks();
    console.log(feedbacks);

  return (
    <>
      <div className="flex justify-between mb-4">
        <Link href="/home" className="bg-neutral-950 hover:bg-neutral-800 rounded-lg px-4 py-2 text-neutral-400">
          Voltar
        </Link>
      </div>

      {
        feedbacks.map((feedback) => (
          feedback.employeeId._id == employeeId.value ?
          <div key={feedback._id} className="p-4 bg-neutral-950 my-3 flex-col rounded-lg text-neutral-100">
            <h2 className="font-bold text-2xl">Feedback de {feedback.giverId.name}</h2>
            <p className="text-sm text-neutral-300">Mensagem: {feedback.message}</p>
            <p className="text-sm text-neutral-400">Funcionário: {feedback.employeeId.name}</p>
            <p className="text-sm text-neutral-400">Nota: {feedback.rate}</p>
            <p className="text-sm text-neutral-400">Data: {new Date(feedback.createdAt).toLocaleDateString()}</p>
          </div> : null
        ))
      }
    </>
  );
}
