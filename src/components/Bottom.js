import React, {useContext} from 'react';
import { TfiPackage } from "react-icons/tfi"
import { FiUsers, FiSettings } from "react-icons/fi"
import { MdOutlineCategory } from "react-icons/md"
import { RxDashboard, RxExit } from "react-icons/rx"
import { CgMenuGridR } from "react-icons/cg"
import Link from 'next/link';
import { ThemeContext } from "@/app/contexts/ThemeContext"

export function Bottom({ className }) {
const { theme } = useContext(ThemeContext);

    return (
      <div className={`${theme === 'dark' ? 'bg-gray-800': 'bg-gray-200'} fixed bottom-0 left-0 z-50 w-full h-16  border-t border-gray-200 ${className}`}>
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
            <Link href={"/dashboard"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <RxDashboard className="text-gray-500"/>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Dashboard</span>
            </Link>
            <Link href={"/products"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <TfiPackage className="text-gray-500"/>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Produtos</span>
            </Link>
            <Link href={"/categories"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <MdOutlineCategory className="text-gray-500"/>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Categorias</span>
            </Link>
            <Link href={"/users"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FiUsers className="text-gray-500"/>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Usuários</span>
            </Link>
            <Link href={"/config"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FiSettings className="text-gray-500"/>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Config</span>
            </Link>
        </div>
        </div>
    )
}