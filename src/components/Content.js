import React from 'react';

export function Content({children, ...rest}) {
    return (
        <main>
            <div {...rest} className='py-24 px-4'>
                {children}
                </div>
        </main>
    )
}