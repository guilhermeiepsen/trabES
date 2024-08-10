import Link from "next/link"
import LogoutButton from "./logout";
import cookie from 'cookie';

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-8 py-3 rounded-lg">
<<<<<<< HEAD
            <Link className="text-neutral-100 font-bold tracking-widest" href={"/home"}> 
=======
            <Link className="text-neutral-100 font-bold tracking-widest" href={"/home"}>
>>>>>>> d3e8d23bdd2b831a7f133c5c22ac912a732dc599
                HUMANLINK
            </Link>
            {cookie.parse['session'] != null ? <LogoutButton/> : ''}
            {console.log(cookie.parse['session'])}
            <LogoutButton/>
        </nav>
    );
}