"use client"

import { useState } from 'react';
import Link from 'next/link';
import RemoveUser from '../../components/RemoveUser'; // Se você estiver usando o botão de remoção
import { HiPencilAlt, HiUser } from "react-icons/hi";

export default function Home() {
  const [name, setname] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!name) return;

    const res = await fetch(`http://localhost:3000/api/search/${name}`);  ///api/search/${name}`
    const data = await res.json();
    console.log('Data received:', data); // Verifique os dados recebidos
    setResults(data);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Pesquisar funcionário"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>

      {results.length > 0 && (
        <>
          <div className="flex justify-between items-center px-8 py-0.1 rounded-lg">
            <Link className="bg-neutral-950 hover:bg-neutral-800 p-2 rounded-lg text-neutral-200" href={"/addVacation"}>
              Pedir Férias
            </Link>
            <Link className="bg-neutral-950 hover:bg-neutral-800 p-2 rounded-lg text-neutral-200" href={"/searchEmployee"}>
              Pesquisar Funcionário
            </Link>
          </div>

          {results.map((employee) => (
            <div key={employee._id} className="p-4 bg-neutral-950 my-3 flex justify-between items-center gap-5 items-start rounded-lg text-neutral-100 tracking-wide">
              <div>
                <h2 className="font-bold text-2xl">{employee.name}</h2>
                <h4 className="text-sm text-neutral-300">{employee.role} <span className="text-neutral-400">em</span> {employee.department}</h4>
              </div>
              <div className="flex gap-2">
                <RemoveUser id={employee._id} />
                <Link href={`/editTopic/${employee._id}`}>
                  <HiPencilAlt size={24} />
                </Link>
                <Link href={`/viewEmployee/${employee._id}`}>
                  <HiUser size={24} />
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
