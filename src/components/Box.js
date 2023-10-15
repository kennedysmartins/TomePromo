import React, {useContext} from 'react';
import { ThemeContext } from '@/app/contexts/ThemeContext'

export function Box({children}) {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`${theme === 'dark' ? 'bg-gray-800 text-white': 'bg-white'} w-full  rounded p-4 m-4`}>
                {children}
        </div>
    )
}
