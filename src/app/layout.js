import { DrawerProvider } from '@/contexts/DrawerContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tome Promo',
  description: 'Quer promo? Tome!',
}

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <DrawerProvider>
    <html lang="en">
      <link rel="manifest" href="manifest.json"></link>
      <body className={inter.className}>{children}</body>
    </html>
    </DrawerProvider>
    </ThemeProvider>
  )
}
