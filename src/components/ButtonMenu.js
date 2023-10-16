import React, {useContext} from 'react';
import { ThemeContext } from '@/contexts/ThemeContext'

export function ButtonMenu({icon: Icon, title, children, ...rest}) {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-zinc-700': 'bg-white hover:bg-zinc-200'} flex items-center  rounded mx-3 p-4 mt-3 cursor-pointer `}>

            {Icon && <Icon size={20}/>}
            <button 
            type='button'
            title={title}
            className='w-full'
            {...rest}>{children}</button>
        </div>

    )
}