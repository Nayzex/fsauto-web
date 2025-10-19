'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, Phone, Moon, Sun, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LinkButton } from '@/components/ui/link-button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from '@/components/theme-provider'
import { useUserRole } from '@/hooks/use-user-role'
import { UserMenu } from './user-menu'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { isStaff, isAdmin } = useUserRole()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalogue?search=${encodeURIComponent(searchQuery)}`)
    } else {
      // Si la recherche est vide, rediriger vers le catalogue sans filtre
      router.push('/catalogue')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in-down">
      {/* Top bar with phone and account */}
      <div className="border-b border-border bg-black dark:bg-gray-950 text-white">
        <div className="container mx-auto flex h-10 items-center justify-between px-4 text-sm">
          {/* Theme toggle - Left */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>

          {/* Phone and Account - Right */}
          <div className="flex items-center gap-4">
            <a href="tel:0641164746" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              <span>06 41 16 47 46</span>
            </a>

            {/* Badge admin/staff */}
            {isStaff && (
              <Link href="/admin" className="flex items-center gap-1 bg-primary/20 hover:bg-primary/30 text-primary px-2 py-1 rounded transition-colors">
                <Shield className="h-3 w-3" />
                <span className="text-xs font-medium">{isAdmin ? 'Admin' : 'Staff'}</span>
              </Link>
            )}

            <UserMenu />
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="FSauto"
              width={60}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <span className="text-xl font-bold whitespace-nowrap">FSauto</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 flex-1">
            <Link
              href="/"
              className={`relative text-sm font-medium transition-colors group ${
                pathname === '/' ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              Accueil
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            <Link
              href="/catalogue"
              className={`relative text-sm font-medium transition-colors group ${
                pathname === '/catalogue' || pathname?.startsWith('/voitures/') ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              Nos véhicules
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                pathname === '/catalogue' || pathname?.startsWith('/voitures/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            <Link
              href="/services"
              className={`relative text-sm font-medium transition-colors group ${
                pathname === '/services' ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              Nos services
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                pathname === '/services' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            <Link
              href="/financement"
              className={`relative text-sm font-medium transition-colors group ${
                pathname === '/financement' ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              Financement
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                pathname === '/financement' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            <Link
              href="/reprise"
              className={`relative text-sm font-medium transition-colors group ${
                pathname === '/reprise' ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              Reprise
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                pathname === '/reprise' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            <Link
              href="/contact"
              className={`relative text-sm font-medium transition-colors group ${
                pathname === '/contact' ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              Contact
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                pathname === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          </nav>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Marque, Modèle, Budget..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-64 pl-10"
              />
            </div>
          </form>

          {/* CTA Button */}
          <LinkButton href="/catalogue" className="hidden md:inline-flex flex-shrink-0 whitespace-nowrap relative overflow-hidden group hover:shadow-lg hover:shadow-primary/50 transition-all">
            <span className="relative z-10">Consulter le catalogue</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </LinkButton>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="lg:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Marque, Modèle, Budget..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
          </div>
        </form>
      </div>
    </header>
  )
}
