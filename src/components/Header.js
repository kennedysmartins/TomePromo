import Link from "next/link";
import React, {useContext} from 'react';
import { ThemeContext } from '@/contexts/ThemeContext' 
import { RiAdminLine } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function Header({ onMenuToggle }) {
  const { data: session } = useSession();
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  return (
    
    <header
      className={` ${theme === 'dark' ? 'bg-gray-800 text-white shadow-slate-700/10': 'bg-zinc-50 text-zinc-900 shadow-slate-300/30'} shadow-md flex justify-between items-center p-4 fixed z-10 w-full`}
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
        {router.pathname !== "/" && session ? (
          <Link href={"/login"}>
          <img src={session.user.image} alt="image do usuário" className="w-10 text-4xl rounded-full bg-zinc-300 hover:bg-zinc-200 p-1 transition-all " />
        </Link>
        ) : (
        <Link href={"/g"}>
          <BsWhatsapp className={`${theme === 'dark' ? 'bg-green-900 hover:bg-green-600 ': 'bg-green-300 hover:bg-green-200 '} text-4xl rounded-full  p-2 transition-all `} />
        </Link>
        )}
        
      </div>
    </header>
  );
}


