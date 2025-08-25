import Link from "next/link";

<Link href="/periodicos" className="hover:underline">
  Periódicos
</Link>
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Campus Insight Board',
  description: 'Foro educativo y hub editorial para estudiantes internacionales.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
