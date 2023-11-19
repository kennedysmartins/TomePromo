import React, {useContext} from 'react';
import { DrawerContext } from '@/contexts/DrawerContext'


export function Content({children, ...rest}) {
  const { drawer } = useContext(DrawerContext);

    return (
        <main className='w-full px-4'>
            <div {...rest} className={`${drawer === 'open'? 'md:ml-72' :'md:ml-8'} pt-20 pb-20 md:pb-12 min-h-screen h-full grid-cols-content`}>
                {children}
                </div>
        </main>
    )
}