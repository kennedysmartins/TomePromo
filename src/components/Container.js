import React, {useContext} from 'react';
import { ThemeContext } from '@/contexts/ThemeContext'

export function Container({ bgActive=true ,children, ...rest}) {
    const { theme } = useContext(ThemeContext);
    return (
        <main  className={`font-sans bg-repeat 
        `} >
            <div className={`min-w-max font-sans bg-repeat items-center justify-center ${bgActive && theme === 'dark' ? 'bg-dark-pattern text-white' : ''} 
        ${bgActive && theme !== 'dark' ? 'bg-white-pattern text-zinc-800' : ''} 
        ${!bgActive && theme === 'dark' ? 'bg-zinc-800 text-white' : ''} 
        ${!bgActive && theme !== 'dark' ? 'bg-zinc-200 text-zinc-800' : ''}`} >{children}</div>
        </main>
    )
}

