import Link from "next/link"
import { cookies } from 'next/headers';

// usando o metodo de cookies do next tu tem acesso ao ao id do usuario

export default function Home() {
  const {value} = cookies().get('user')
  return <div className="*:flex *:items-end *:justify-end *:p-4 *:bg-neutral-950 *:rounded-lg *:h-52 *:w-full grid grid-cols-2 gap-4 *:text-neutral-100 tracking-wide">
          <Link className="" href={`/viewEmployee/${value}`}>
                      MEU PERFIL
          </Link>
          <Link className="" href={"/employeesList"}>
                      LISTA DE FUNCIONÁRIOS
          </Link>
          <Link className="" href={"/vacationsList"}>
                      LISTA DE FÉRIAS
          </Link>
          <Link className="" href={"/hrPolicy"}>
                      POLÍTICA DE RH
          </Link>
          {console.log(value)} 
        </div>
}