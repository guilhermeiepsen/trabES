'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(2);
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [cpf, setCpf] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [admissionDate, setAdmissionDate] = useState('');
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('');
    const [active, setActive] = useState(true);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                username: username,
                email: email,
                password: password,
                userType: userType,
                name: name,
                dateOfBirth: dateOfBirth,
                cpf: cpf,
                phoneNumber: phoneNumber,
                admissionDate: admissionDate,
                department: department,
                role: role,
                active: active
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Senha"
                required
            />
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Corporativo"
                required
            />
            <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Nome Completo"
                required
            />
            <input
                onChange={(e) => setCpf(e.target.value)}
                value={cpf}
                type="text"
                placeholder="CPF"
                required
            />
            <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                type="tel"
                placeholder="Número de Telefone"
                required
            />
            <label className="flex flex-col gap-2 *:bg-black *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
                    Data de Nascimento: 
                    <input
                        onChange={(e) => setDateOfBirth(e.target.value)} //ONCHANGE -- QUANDO MUDA O INPUT PEGA A STRING E BOTA NA VARIAVEL "e"
                        value={dateOfBirth}
                        type = "date"
                    />
                </label>
            <label className="flex flex-col gap-2 *:bg-black *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
                    Data de Contratação: 
                    <input
                        onChange={(e) => setAdmissionDate(e.target.value)} //ONCHANGE -- QUANDO MUDA O INPUT PEGA A STRING E BOTA NA VARIAVEL "e"
                        value={admissionDate}
                        type = "date"
                    />
                </label>
            <input
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
                type="text"
                placeholder="Departamento"
                required
            />
            <input
                onChange={(e) => setRole(e.target.value)}
                value={role}
                type="text"
                placeholder="Cargo"
                required
            />
            <button type="submit" className="hover:bg-neutral-800 font-bold text-white min-w-max">
                Registrar-se
            </button>
        </form>
    );
};

export default AddUser;
