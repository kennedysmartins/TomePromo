import Link from 'next/link';
import React from 'react';

export function Header() {
    return (
        <header className="w-full p-3 bg-gray-50 border-b-slate-100 border fixed z-10">
            <div className='flex gap-3 items-center max-w-5xl mx-auto'>
                <img className='rounded-full w-9 justify-center ' src='/logo-tomepromo.jpeg'></img>
                <h1 className='text-xl font-semibold text-black' >Tome Promo</h1>
            </div>

            <div>
                <Link href={"/admin"}>Admin Panel</Link>
            </div>

        </header>
        
    )
}