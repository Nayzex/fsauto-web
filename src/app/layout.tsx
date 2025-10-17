import type { ReactNode } from 'react'
import './globals.css'
import { Providers } from '@/components/providers'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}