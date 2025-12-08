'use client'

import { ThemeProvider } from './theme-provider'
import { Header } from './layout/header'
import { Footer } from './layout/footer'
import { SessionTimeout } from '@/features/auth/components/session-timeout'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SessionTimeout />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Toaster richColors closeButton />
    </ThemeProvider>
  )
}
