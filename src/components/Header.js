import Link from 'next/link';
import React from 'react';

export function Header() {
    return (
        <header className="flex justify-between w-full px-96 py-4 bg-gray-50 border-b-slate-100 border fixed z-10">
            <div className='max-w-5xl'>
                <a href='/' className='flex gap-3 items-center'>
                    <img className='rounded-full w-9 justify-center ' src='/logo-tomepromo.jpeg'></img>
                    <h1 className='text-xl font-semibold text-black' >Tome Promo</h1>
                </a>
            </div>

            <div className='items-center pt-1'>
                <Link href={"/admin"}>Admin Panel</Link>
            </div>

        </header>
        
    )
}