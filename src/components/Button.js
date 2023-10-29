import React, {useContext} from 'react';
import { ThemeContext } from '@/contexts/ThemeContext' 


export function Button({icon: Icon, children, className, ...rest}) {
  const { theme } = useContext(ThemeContext);

    return (
        <div>

            {Icon && <Icon size={20}/>}
            <button 
            className={`${theme === 'dark' ? 'bg-green-800 text-white shadow-slate-700/10': 'bg-green-300 text-zinc-900 shadow-slate-300/30'} rounded p-2 w-full ${className}`}
            {...rest}>{children}</button>
        </div>

    )
}