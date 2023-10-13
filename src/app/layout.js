import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Infnet - Tome Promo',
  description: 'Quer promo? Tome!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="manifest" href="manifest.json"></link>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
