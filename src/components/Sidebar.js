import React from 'react';
import { TfiPackage } from "react-icons/tfi"
import { MdOutlineCategory } from "react-icons/md"
import { RxDashboard, RxExit } from "react-icons/rx"

import { ButtonMenu } from './ButtonMenu';


export function Sidebar() {
    return (
        <main>
            <div className='w-72 px-3 pt-20 h-screen bg-zinc-50 overflow-auto text-zinc-900 shadow-lg shadow-slate-300 relative'>
                <ButtonMenu icon={RxDashboard} title="Dashboard">Dashboard</ButtonMenu>
                <ButtonMenu icon={TfiPackage} title="Produtos">Produtos</ButtonMenu>
                <ButtonMenu icon={MdOutlineCategory} title="Categorias">Categorias</ButtonMenu>
                <footer className='absolute bottom-2 w-[17rem]'>
                <ButtonMenu icon={RxExit} title="Sair">Sair</ButtonMenu>

                </footer>
                </div>
        </main>
    )
}