import Link from "next/link"
import { cookies } from 'next/headers';

// Por enquanto tem que usar esse useEffect e useState do react para conseguir ter acesso ao cookie

export default function Home() {
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
          {console.log(cookies().get('user'))}
        </div>
}