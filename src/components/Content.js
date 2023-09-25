import React from 'react';

export function Content({children}) {
    return (
        <main>
            <div className='p-24 h-full min-h-screen w-full min-w-full overflow-auto'>
                {children}
                </div>
        </main>
    )
}