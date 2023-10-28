import React, {useContext} from 'react';
import { DrawerContext } from '@/contexts/DrawerContext'


export function Content({children, ...rest}) {
  const { drawer } = useContext(DrawerContext);

    return (
        <main>
            <div {...rest} className={`${drawer === 'open'? 'ml-72' :'ml-8'} py-24 px-4  min-h-screen h-full grid-cols-content`}>
                {children}
                </div>
        </main>
    )
}