"use client"; 

import Link from "next/link";
import LogoutButton from "./logout";
import { useEffect, useState } from 'react';
import cookies from 'js-cookie';

// Por enquanto tem que usar esse useEffect e useState do react para conseguir ter acesso ao cookie

export default function Navbar() {
    const [sessionCookie, setSessionCookie] = useState(null);

    useEffect(() => {
        setSessionCookie(cookies.get('user'));
    }, []);
    
    return (
        <nav className="flex justify-between items-center px-8 py-3 rounded-lg">
            <Link className="text-neutral-100 font-bold tracking-widest" href={"/home"}>
                HUMANLINK
            </Link>
            {sessionCookie ? <LogoutButton /> : ''}
        </nav>
    );
}
