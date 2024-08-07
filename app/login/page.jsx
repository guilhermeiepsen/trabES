'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            // const result = await response.json();
            // console.log(result); // Log the response from the server
            // if (response.ok) {
            //     router.push('/'); // Redirect to home page after successful login
            // } else {
            //     console.error('Login failed:', result.message);
            //     router.push('/login'); // Redirect to login page on failure
            // }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-neutral-950 px-4 py-2 rounded-lg text-black-200">
            <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Username"
                className="p-2 rounded-md"
                required
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="p-2 rounded-md"
                required
            />
            <button type="submit" className="hover:bg-neutral-800 font-bold text-white min-w-max">
                Login
            </button>
            <a href="/register" className="hover:bg-neutral-800 font-bold text-white min-w-max text-center">
                Register
            </a>
        </form>
    );
};

export default Login;