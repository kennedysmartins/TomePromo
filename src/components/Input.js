import React, {useContext} from 'react';
import { ThemeContext } from '@/contexts/ThemeContext' 


export function Input({icon: Icon, className, ...rest}) {
  const { theme } = useContext(ThemeContext);

    return (
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-white shadow-slate-700/10': 'bg-zinc-50 text-zinc-900 shadow-slate-300/30'} placeholder-gray-400 w-full rounded ${className}`}>

            {Icon && <Icon size={20}/>}
            <input 
            className={`${theme === 'dark' ? 'bg-gray-800 text-white shadow-slate-700/10': 'bg-zinc-50 text-zinc-900 shadow-slate-300/30'} placeholder-gray-400 rounded p-2 w-full ${className}`}
            {...rest} />
        </div>

    )
}