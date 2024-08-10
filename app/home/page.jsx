"use client"; 
import Link from "next/link"
import cookies from 'js-cookie';
import { useEffect, useState } from 'react';

// Por enquanto tem que usar esse useEffect e useState do react para conseguir ter acesso ao cookie

export default function Home() {
  const [sessionCookie, setSessionCookie] = useState(null);

    useEffect(() => {
        setSessionCookie(cookies.get('user'));
    }, []);
  return <div className="*:p-4 *:bg-neutral-950 my-3 flex flex-col justify-between items-center gap-9 items-start *:rounded-lg  text-neutral-100 tracking-wide">
          <Link className="text-neutral-100" href={"/employeesList"}>
                      LISTA DE FUNCIONÁRIOS
          </Link>
          <Link className="text-neutral-100" href={"/vacationsList"}>
                      LISTA DE FÉRIAS
          </Link>
          <Link className="text-neutral-100" href={"/hrPolicy"}>
                      POLÍTICA DE RH
          </Link>
          <Link className="text-neutral-100" href={"/searchEmployee"}>
                      PESQUISAR FUNCIONÁRIO
          </Link>
        </div>
}