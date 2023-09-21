import React from 'react';

export function Content({children}) {
    return (
        <main>
            <div className='pt-20 overflow-auto'>
                {children}
                </div>
        </main>
    )
}