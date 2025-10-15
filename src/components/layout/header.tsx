'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LinkButton } from '@/components/ui/link-button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalogue?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar with phone and account */}
      <div className="border-b border-border bg-black text-white">
        <div className="container mx-auto flex h-10 items-center justify-end gap-4 px-4 text-sm">
          <a href="tel:0641164746" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="h-4 w-4" />
            <span>06 41 16 47 46</span>
          </a>
          <Link href="/admin/login" className="flex items-center gap-2 hover:text-primary transition-colors">
            <User className="h-4 w-4" />
            <span>Mon compte</span>
          </Link>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="FSauto"
              width={60}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <span className="text-xl font-bold">FSauto</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/catalogue" className="text-sm font-medium hover:text-primary transition-colors">
              Nos véhicules
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
              Nos services
            </Link>
            <Link href="/financement" className="text-sm font-medium hover:text-primary transition-colors">
              Financement
            </Link>
            <Link href="/reprise" className="text-sm font-medium hover:text-primary transition-colors">
              Reprise
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Marque, Modèle, Budget..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
            </div>
          </form>

          {/* CTA Button */}
          <LinkButton href="/catalogue" className="hidden md:inline-flex">
            Consulter le catalogue
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
