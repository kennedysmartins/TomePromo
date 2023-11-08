import React, {useContext} from 'react';
import { ThemeContext } from '@/contexts/ThemeContext' 


export function Textarea({icon: Icon, ...rest}) {
  const { theme } = useContext(ThemeContext);

    return (
        <div>

            <textarea 
            className={`${theme === 'dark' ? 'bg-gray-800 text-white shadow-slate-700/10': 'bg-zinc-50 text-zinc-900 shadow-slate-300/30'} placeholder-gray-400/30 rounded p-2 w-full `}
            {...rest} ></textarea>
        </div>

    )
}