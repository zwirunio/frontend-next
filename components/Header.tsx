"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { ModeToggle } from "@/components/ModeToggle";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context-provider";


function Header(){
    const pathname = usePathname();
    const authContext = useContext(AuthContext);
    return(
      <header className={"w-screen dark:text-white text-white dark:bg-blue-800 bg-blue-500 p-4 space-x-4"}>
        <Link className={`link ${pathname === '/login' ? 'active' : ''}`} href={"/login"}>Login</Link>
        <Link className={`link ${pathname === '/profile' ? 'active' : ''}`} href={"/profile"}>Profile</Link>
        <Link className={`link ${pathname === '/courses' ? 'active' : ''}`} href={"/courses"}>Courses</Link>
        <ModeToggle/>
        <button onClick={() => authContext?.setAuth({email:"text@email.com"})}>Login</button>
        <button onClick={() => authContext?.setAuth(null)}>Logout </button>
      </header>
    );
}

export default Header;
