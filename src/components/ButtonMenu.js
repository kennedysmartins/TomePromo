import React from 'react';

export function ButtonMenu({icon: Icon, title, children, ...rest}) {
    return (
        <div className='flex items-center bg-white rounded mx-3 p-4 mt-3 cursor-pointer hover:bg-zinc-200'>

            {Icon && <Icon size={20}/>}
            <button 
            type='button'
            title={title}
            className='w-full'
            {...rest}>{children}</button>
        </div>

    )
}