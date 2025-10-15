import type { ReactNode } from 'react'
import './globals.css'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster richColors closeButton />
      </body>
    </html>
  )
}