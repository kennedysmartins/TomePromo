import React, {useContext} from 'react';


export function ContentHome({children, ...rest}) {

    return (
        <main>
            <div {...rest} className={`pt-8 px-4  min-h-screen h-full grid-cols-content`}>
                {children}
                </div>
        </main>
    )
}