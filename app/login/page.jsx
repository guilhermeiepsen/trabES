'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        await response.json();
        if (response.ok) {
            router.push("/"); // Redireciona para a página inicial após login bem-sucedido
        } else {
            console.error('Login failed');
            router.push('/login'); // Redireciona para a página de login ao falhar
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-neutral-950 px-4 py-2 rounded-lg text-black-200">
            <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Usuário"
                className="p-2 rounded-md"
                required
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Senha"
                className="p-2 rounded-md"
                required
            />
            <button type="submit" className="hover:bg-neutral-800 font-bold text-white min-w-max">
                Login
            </button>
            <a href="/register" className="hover:bg-neutral-800 font-bold text-white min-w-max text-center">
                Registrar-se
            </a>
        </form>
    );
};

export default Login;
