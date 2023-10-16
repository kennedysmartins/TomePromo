import React, {useContext} from 'react';
import { TfiPackage } from "react-icons/tfi"
import { FiUsers, FiSettings } from "react-icons/fi"
import { MdOutlineCategory } from "react-icons/md"
import { RxDashboard, RxExit } from "react-icons/rx"
import { CgMenuGridR } from "react-icons/cg"
import Link from 'next/link';
import { ThemeContext } from "@/contexts/ThemeContext"

export function Bottom({ className }) {
const { theme } = useContext(ThemeContext);

    return (
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700': 'bg-gray-200 border-gray-200'} fixed bottom-0 left-0 z-50 w-full h-16  border-t  ${className}`}>
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
            <Link href={"/dashboard"} className="inline-flex flex-col items-center justify-center px-5   group">
                <RxDashboard className="text-gray-500"/>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 ">Dashboard</span>
            </Link>
            <Link href={"/products"} className="inline-flex flex-col items-center justify-center px-5   group">
                <TfiPackage className="text-gray-500"/>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 ">Produtos</span>
            </Link>
            <Link href={"/categories"} className="inline-flex flex-col items-center justify-center px-5   group">
            <MdOutlineCategory className="text-gray-500"/>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 ">Categorias</span>
            </Link>
            <Link href={"/users"} className="inline-flex flex-col items-center justify-center px-5   group">
            <FiUsers className="text-gray-500"/>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 ">Usuários</span>
            </Link>
            <Link href={"/config"} className="inline-flex flex-col items-center justify-center px-5   group">
            <FiSettings className="text-gray-500"/>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 ">Config</span>
            </Link>
        </div>
        </div>
    )
}