import { Container } from './styles'

import React, {useContext} from 'react';
import { ThemeContext } from '@/contexts/ThemeContext'

export function Box({children}) {
    const { theme } = useContext(ThemeContext);
    return (
        <Container theme={theme}>
                {children}
        </Container>
    )
}
