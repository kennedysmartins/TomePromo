import React from 'react';

export function Container({children}) {
    return (
        <main className={`font-sans bg-white-pattern`}>
            <div className="min-h-screen  items-center justify-center">{children}</div>
        </main>
    )
}