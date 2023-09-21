import React from 'react';

export function Content({children}) {
    return (
        <main>
            <div className='pt-16 overflow-auto'>{children}</div>
        </main>
    )
}