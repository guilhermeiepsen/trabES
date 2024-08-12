import Link from "next/link"
import { cookies } from 'next/headers';

// usando o metodo de cookies do next tu tem acesso ao ao id do usuario

export default function Home() {
  let sessionCookie = cookies().get('user');
  const loggedId = sessionCookie.value;
  sessionCookie = cookies().get('role');
  const role = sessionCookie.value;
  return <div className="*:flex *:items-end *:justify-end *:p-4 *:bg-neutral-950 *:rounded-lg *:h-32 *:w-full grid grid-cols-2 gap-4 *:text-neutral-100 tracking-wide">
          <Link className="hover:bg-neutral-800" href={`/viewEmployee/${loggedId}`}>
                      MEU PERFIL
          </Link>
          { role != 2 ?
          <Link className="hover:bg-neutral-800" href={"/register"}>
                ADICIONAR FUNCIONÁRIO
          </Link> : null
          }
          { role != 2 ?
          <Link className="hover:bg-neutral-800" href={"/employeesList"}>
                      LISTA DE FUNCIONÁRIOS
          </Link> : null
          }
          <Link className="hover:bg-neutral-800" href={"/addVacation"}>
                PEDIR FÉRIAS
          </Link>
          <Link className="hover:bg-neutral-800" href={"/vacationsList"}>
                {role == 2 ? "MEUS PEDIDOS DE FÉRIAS" : "LISTA DE FÉRIAS"}
          </Link>
          <Link className="hover:bg-neutral-800" href={"/hrPolicy"}>
                      POLÍTICA DE RH
          </Link>
        </div>
}