import React from 'react';

export function Content({children, ...rest}) {
    return (
        <main>
            <div {...rest} className='py-24 px-4 grid-cols-content'>
                {children}
                </div>
        </main>
    )
}