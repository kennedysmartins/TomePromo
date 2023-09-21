import React from 'react';

export function Title({children}) {
    return (
        <div className='bg-red w-full'>
            <h1>
                {children}
            </h1>
        </div>
    )
}