import React from 'react';
import { TfiPackage } from "react-icons/tfi"
import { FiUsers, FiSettings } from "react-icons/fi"
import { MdOutlineCategory } from "react-icons/md"
import { RxDashboard, RxExit } from "react-icons/rx"

import { ButtonMenu } from './ButtonMenu';
import Link from 'next/link';


export function Sidebar() {
    return (
        <aside>
            <div className='w-72 px-3 pt-20 h-full min-h-screen bg-zinc-50 overflow-auto text-zinc-900 shadow-lg shadow-slate-300 relative'>
                <Link href={"/dashboard"}><ButtonMenu icon={RxDashboard} title="Dashboard">Dashboard</ButtonMenu></Link>
                <Link href={"/products"}><ButtonMenu icon={TfiPackage} title="Produtos">Produtos</ButtonMenu></Link>
                <Link href={"/categories"}><ButtonMenu icon={MdOutlineCategory} title="Categorias">Categorias</ButtonMenu></Link>
                <Link href={"/users"}><ButtonMenu icon={FiUsers} title="Usuários">Usuários</ButtonMenu></Link>
                <Link href={"/config"}><ButtonMenu icon={FiSettings} title="Configurações">Configurações</ButtonMenu></Link>
                <footer className='absolute bottom-2 w-[17rem]'>
                <ButtonMenu icon={RxExit} title="Sair">Sair</ButtonMenu>

                </footer>
                </div>
        </aside>
    )
}