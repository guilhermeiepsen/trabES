import Link from "next/link"

export default function Navbar () {
    return (
        <nav className="flex justify-between items-center px-8 py-3 rounded-lg">
            <Link className="text-neutral-100 font-bold tracking-widest" href={"/home"}> 
                HUMANLINK
            </Link>
            { <Link className="bg-neutral-950 hover:bg-neutral-800 p-2 rounded-lg text-neutral-200" href={"/addTopic"}>
                Registrar Funcionário
            </Link> }
            { <Link className="bg-neutral-950 hover:bg-neutral-800 p-2 rounded-lg text-neutral-200" href={"/hrPolicy"}>
                Política de RH
            </Link> }
        </nav>
    );
}