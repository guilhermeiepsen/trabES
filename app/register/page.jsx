'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                username: username,
                email: email,
                password: password,
            };
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            if (response.ok) {
                router.push("/home");
            } else {
                throw new Error("Failed to create new user");
            }
        } catch (error) {
            console.log(error);
            router.push('/register');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 *:bg-neutral-950 *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
            <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Nome de Usuário"
                required
                title='Nome de usuário único para acesso ao sistema.'
            />
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Senha"
                required
            />
            <button type="submit" className="hover:bg-neutral-800 font-bold text-white min-w-max">
                Registrar-se
            </button>
        </form>
    );
};

export default AddUser;
