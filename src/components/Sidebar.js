import React from 'react';
import { TfiPackage } from "react-icons/tfi"
import { FiUsers, FiSettings } from "react-icons/fi"
import { MdOutlineCategory } from "react-icons/md"
import { RxDashboard, RxExit } from "react-icons/rx"
import { CgMenuGridR } from "react-icons/cg"

import { ButtonMenu } from './ButtonMenu';
import Link from 'next/link';


export function Sidebar({ isOpen, onClose }) {
    const drawerStyle = {
        transform: isOpen ? 'translateX(0%)' : 'translateX(-35%)',
        marginLeft: isOpen ? '0' : '-150px', // Adicione a margem esquerda negativa desejada quando o drawer estiver fechado
      };
      
    return (
        <aside style={drawerStyle}>
            <div className=' relative w-72 px-3 pt-20 h-full min-h-screen bg-zinc-50 overflow-auto text-zinc-900 shadow-lg shadow-slate-300 relative'>
                <Link href={"/dashboard"}><ButtonMenu icon={RxDashboard} title="Dashboard">Dashboard</ButtonMenu></Link>
                <Link href={"/products"}><ButtonMenu icon={TfiPackage} title="Produtos">Produtos</ButtonMenu></Link>
                <Link href={"/categories"}><ButtonMenu icon={MdOutlineCategory} title="Categorias">Categorias</ButtonMenu></Link>
                <Link href={"/users"}><ButtonMenu icon={FiUsers} title="Usuários">Usuários</ButtonMenu></Link>
                <Link href={"/config"}><ButtonMenu icon={FiSettings} title="Configurações">Configurações</ButtonMenu></Link>
                
                <CgMenuGridR
  onClick={onClose}
  className='absolute cursor-pointer bg-zinc-200 top-2/4 right-0 text-3xl rounded-tl-lg w-9 h-9 p-1 rounded-bl-lg'
/>


                
                <footer className='absolute bottom-2 w-[17rem]'>
                <ButtonMenu icon={RxExit} title="Sair">Sair</ButtonMenu>

                </footer>
                </div>
        </aside>
    )
}