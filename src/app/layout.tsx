import type { ReactNode } from 'react'
import './globals.css'
import { Toaster } from 'sonner'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Toaster richColors closeButton />
      </body>
    </html>
  )
}