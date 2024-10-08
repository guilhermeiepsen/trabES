'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import cookies from 'js-cookie';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const redirect = () => {
        const value = cookies.get('user');
        console.log(value);

        if (value) {
            router.push('/home');
        } else {
            console.log('No redirection needed.');
        }
    };

    useEffect(() => {
        redirect();
    }, []); // Executa a função redirect ao montar o componente

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                router.push('/home');
                router.refresh();
            } else {
                alert("Credenciais incorretas");
                console.error('Login failed:', data.message); 
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 *:bg-neutral-950 *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
            <label className="flex flex-col gap-2 *:bg-black *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
                Nome de usuário
                <input
                    onChange={(e) => setUsername(e.target.value)} //ONCHANGE -- QUANDO MUDA O INPUT PEGA A STRING E BOTA NA VARIAVEL "e"
                    value={username}
                    type="text"
                    required
                />
            </label>
            <label className="flex flex-col gap-2 *:bg-black *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
                Senha
                <input
                    onChange={(e) => setPassword(e.target.value)} //ONCHANGE -- QUANDO MUDA O INPUT PEGA A STRING E BOTA NA VARIAVEL "e"
                    value={password}
                    type="password"
                    required
                />
            </label>
            <button type="submit" className="hover:bg-neutral-800 font-bold text-white min-w-max">
                Login
            </button>
        </form>
    );
};

export default Login;
