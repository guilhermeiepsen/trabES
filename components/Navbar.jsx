import Link from "next/link";
import LogoutButton from "./logout";
import { cookies } from "next/headers";


export default function Navbar() {
    const sessionCookie = cookies().get('user');
    const sessionRole = cookies().get('role');
    const rolesDescription = {
        0: 'Administrador',
        1: 'Gerente',
        2: 'Funcionário'
      }

    return (
        <nav className="flex justify-between items-center px-8 py-3 rounded-lg text-neutral-100">
            <Link className=" font-bold tracking-widest" href={"/home"}>
                HUMANLINK {sessionRole ? ' - ' +rolesDescription[sessionRole.value] : null}
            </Link>
            
            {sessionCookie ? <LogoutButton /> : ''}
        </nav>
    );
}
