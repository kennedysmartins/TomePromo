import React, {useContext} from 'react';
import { ThemeContext } from '@/app/contexts/ThemeContext'

export function Container({ bgActive=true ,children}) {
    const { theme } = useContext(ThemeContext);
    return (
        <main className={`font-sans 
        ${bgActive && theme === 'dark' ? 'bg-dark-pattern text-white' : ''} 
        ${bgActive && theme !== 'dark' ? 'bg-white-pattern text-zinc-800' : ''} 
        ${!bgActive && theme === 'dark' ? 'bg-zinc-800 text-white' : ''} 
        ${!bgActive && theme !== 'dark' ? 'bg-zinc-200 text-zinc-800' : ''}`}>
            <div className="min-h-screen  items-center justify-center">{children}</div>
        </main>
    )
}

