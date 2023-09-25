import React from 'react';

export function Container({ bgActive=true ,children}) {
    return (
        <main className={`font-sans ${bgActive ? 'bg-white-pattern' : 'bg-zinc-200'}`}>
            <div className="min-h-screen  items-center justify-center">{children}</div>
        </main>
    )
}