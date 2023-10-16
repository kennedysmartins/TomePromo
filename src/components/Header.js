import Link from "next/link";
import React, {useContext} from 'react';
import { ThemeContext } from '@/app/contexts/ThemeContext'
import { RiAdminLine } from "react-icons/ri";
import { useSession } from "next-auth/react";

export function Header({ onMenuToggle }) {
  const { data: session } = useSession();
  const { theme } = useContext(ThemeContext);
  return (
    
    <header
      className={` ${theme === 'dark' ? 'bg-gray-800 text-white': 'bg-zinc-50 text-zinc-900 shadow-slate-300'} flex justify-between items-center p-4 fixed z-10 w-full
    
    `}
    >
      <Link href="/" className="flex gap-3 items-center">
        <img
          className="rounded-full w-9 justify-center "
          src="/logo-tomepromo.jpeg"
        ></img>
        <h1  className="text-xl font-semibold">
          Tome Promo
        </h1>
      </Link>
      <div className="items-center pt-1">
        {session ? (
          <Link href={"/dashboard"}>
          <img src={session.user.image} alt="image do usuário" className="w-10 text-4xl rounded-full bg-zinc-300 hover:bg-zinc-200 p-1 transition-all " />
        </Link>
        ) : (
        <Link href={"/login"}>
          <RiAdminLine className="text-4xl rounded-full bg-zinc-300 hover:bg-zinc-200 p-2 transition-all " />
        </Link>
        )}
        
      </div>
    </header>
  );
}


