import Link from "next/link"

export default function Navbar () {
    return (
        <nav className="flex justify-between items-center px-8 py-3 rounded-lg">
            <Link className="text-neutral-100 font-bold tracking-widest" href={"/home"}> 
                HUMANLINK
            </Link>
        </nav>
    );
}