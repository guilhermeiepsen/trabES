'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton(){
    const router = useRouter();

     async function handleLogout() {
        try {
            const response = await fetch('http://localhost:3000/api/auth/logout', {
                method: 'GET',
            });
            if (response.ok) {
                router.push('/login'); // Redirecionar para a página de login após o logout
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    return (
        <button onClick={handleLogout} className="bg-neutral-950 hover:bg-neutral-800 p-2 rounded-lg text-neutral-200">
            Logout
        </button>
    );
};


