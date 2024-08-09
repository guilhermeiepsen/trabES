import Link from "next/link"
import LogoutButton from "./logout";
import cookie from 'cookie';

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-8 py-3 rounded-lg">
            <Link className="text-neutral-100 font-bold tracking-widest" href={"/home"}>
                HUMANLINK
            </Link>
            {cookie.parse['session'] != null ? <LogoutButton/> : ''}
            {console.log(cookie.parse['session'])}
        </nav>
    );
}