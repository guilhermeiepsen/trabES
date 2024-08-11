import Link from "next/link";
import LogoutButton from "./logout";
import { cookies } from "next/headers";


export default function Navbar() {
    const sessionCookie = cookies().get('user');
    return (
        <nav className="flex justify-between items-center px-8 py-3 rounded-lg">
            <Link className="text-neutral-100 font-bold tracking-widest" href={"/home"}>
                HUMANLINK 
            </Link>
            {sessionCookie ? <LogoutButton /> : ''}
        </nav>
    );
}
