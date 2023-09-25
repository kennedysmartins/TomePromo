import React from 'react';

export function Box({children}) {
    return (
        <div className='w-full bg-white rounded p-4 m-4'>
                {children}
        </div>
    )
}