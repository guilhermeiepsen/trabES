"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import RemoveBtn from "./RemoveUser";
import { HiPencilAlt, HiUser, HiAnnotation, HiExclamation, HiRefresh } from "react-icons/hi";

export default function SearchEmployee({ id, role }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const giverId = id;
  const roleCookie = role;

  const rolesDescription = {
    0: 'Administrador',
    1: 'Gerente',
    2: 'Funcionário'
  }

  const getEmployees = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/employees', {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const { users } = await res.json();
      setData(users); // Atualiza o estado com os usuários retornados
    } catch (error) {
      console.log("Error loading users: ", error);
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`http://localhost:3000/api/search?name=${name}`, {
        method: 'GET',
        cache: "no-store"
      });
      if (!result.ok) {
        throw new Error("Failed to fetch users");
      }

      const user = await result.json();
      setData(user);
    } catch (error) {
      console.log("Error searching for employee: ", error);
    }
  }

  return (
    <>
      <div className="flex justify-between py-4">
        <Link href="/employeesList" className="bg-neutral-950 hover:bg-neutral-800 rounded-lg px-4 py-2 self-left max-w-fit text-neutral-400">
          Voltar
        </Link>
        <form onSubmit={handleSearch} className="flex flex-col-4 gap-2 *:bg-neutral-950 *:px-4 *:py-2 *:rounded-lg *:text-neutral-200">
          <input
            type="text"
            value={name}
            placeholder="Pesquisar funcionário"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="hover:bg-neutral-800 font-bold text-white min-w-max">Pesquisar</button>
        </form>
        <Link className="bg-blue-800 hover:bg-blue-700 p-2 rounded-lg text-neutral-200" href={"/register"}>
          Registrar Funcionário
        </Link>
      </div>

      {data.map((t) => (
        <div key={t._id} className="p-4 bg-neutral-950 my-3 flex-col justify-between items-center gap-5 items-start rounded-lg text-neutral-100 tracking-wide">
          <div>
            <h2 className="font-bold text-2xl">{t.name}</h2>
            <h4 className="text-sm text-neutral-300">{t.role} <span className="text-neutral-400">em</span> {t.department}</h4>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            {rolesDescription[t.userType]}
            {roleCookie == 0 ?
              <Link href={`/addManager/${t._id}`} title="Trocar Cargo">
                <HiRefresh size={24} />
              </Link> : null
            }
            {roleCookie != 2 ?
              <Link href={`/viewEmployee/${t._id}`} title="Visualizar">
                <HiUser size={24} />
              </Link> : null
            }

            {roleCookie != 2 ?
              <Link href={`/editTopic/${t._id}`} title="Editar">
                <HiPencilAlt size={24} />
              </Link> : null
            }
            {roleCookie != 2 ?
              <Link href={`/giveFeedback/${t._id}`} title="Avaliar">
                <HiAnnotation size={24} />
              </Link> : null
            }

            {roleCookie == 2 ?
              <Link href={`/giveMisconduct/${t._id}`} title="Denunciar Conduta">
                <HiExclamation size={24} color="yellow" />
              </Link> : null
            }

            {roleCookie != 2 ?
              <RemoveBtn id={t._id} />
              : null
            }
          </div>
        </div>
      ))}
    </>
  );
}
