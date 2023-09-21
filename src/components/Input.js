import React from 'react';

export function Input({icon: Icon, ...rest}) {
    return (
        <div>

            {Icon && <Icon size={20}/>}
            <input 
            className='w-full'
            {...rest} />
        </div>

    )
}