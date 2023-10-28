import React, {useContext} from 'react';
import { ThemeContext } from '@/contexts/ThemeContext'
import { TfiPackage } from "react-icons/tfi"
import { FiUsers, FiSettings } from "react-icons/fi"
import { MdOutlineCategory } from "react-icons/md"
import { RxDashboard, RxExit } from "react-icons/rx"
import { CgMenuGridR } from "react-icons/cg"
import { useSession, signIn, signOut } from "next-auth/react";

import { ButtonMenu } from './ButtonMenu'; 
import Link from 'next/link';


export function Sidebar({ isOpen, onClose, className }) {
  const drawerStyle = {
    transform: isOpen ? 'translateX(0%)' : 'translateX(-35%)',
    marginLeft: isOpen ? '0' : '-150px', 
  };
  const { theme } = useContext(ThemeContext);

  return (
    <aside className={`${theme === 'dark' ? 'bg-gray-800 text-white shadow-slate-700/30': 'bg-zinc-50 text-zinc-900 shadow-slate-300/50'} grid-cols-sidebar w-72 px-3 pt-20  min-h-screen h-full overflow-auto shadow-lg fixed ${className}`} style={drawerStyle}>
      <Link href={"/dashboard"}><ButtonMenu icon={RxDashboard} title="Dashboard">Dashboard</ButtonMenu></Link>
      <Link href={"/products"}><ButtonMenu icon={TfiPackage} title="Produtos">Produtos</ButtonMenu></Link>
      <Link href={"/categories"}><ButtonMenu icon={MdOutlineCategory} title="Categorias">Categorias</ButtonMenu></Link>
      <Link href={"/users"}><ButtonMenu icon={FiUsers} title="Usuários">Usuários</ButtonMenu></Link>
      <Link href={"/config"}><ButtonMenu icon={FiSettings} title="Configurações">Configurações</ButtonMenu></Link>

      <CgMenuGridR onClick={onClose} className={`${theme === 'dark' ? 'bg-gray-700 text-white': 'bg-zinc-200'} absolute cursor-pointer  top-2/4 right-0 text-3xl rounded-tl-lg w-9 h-9 p-1 rounded-bl-lg` }/>

      <footer className='absolute bottom-2 w-[17rem]'>
        <ButtonMenu icon={RxExit} onClick={() => {signOut()}} title="Sair">Sair</ButtonMenu>
      </footer>
    </aside>
  )
}
