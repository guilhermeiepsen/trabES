import Link from "next/link"
import cookies from 'cookie'

export default function Home() {
<<<<<<< HEAD
  return <>
    <EmployeesList />
    <VacationsList/>
  </>
=======
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
          {cookies.parse['session']}
        </div>
>>>>>>> d3e8d23bdd2b831a7f133c5c22ac912a732dc599
}