'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, Shield, LayoutDashboard, Settings, LogOut, Mail } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useUserRole } from '@/hooks/use-user-role'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function UserMenu() {
  const { role, loading, isStaff, isAdmin } = useUserRole()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  // Récupérer l'email de l'utilisateur
  useEffect(() => {
    async function fetchUserEmail() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setUserEmail(user.email)
      }
    }

    if (role) {
      fetchUserEmail()
    }
  }, [role])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // 1. Déconnexion côté client (localStorage)
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // 2. Déconnexion côté serveur (cookies HTTP-only)
      await fetch('/api/auth/logout', {
        method: 'POST'
      })

      toast.success('Déconnexion réussie')

      // Attendre un peu pour que le toast s'affiche
      await new Promise(resolve => setTimeout(resolve, 500))

      // Navigation complète pour nettoyer tout l'état
      window.location.href = '/'
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      toast.error('Erreur lors de la déconnexion')
      setIsLoggingOut(false)
    }
  }

  // Pendant le chargement, afficher un lien simple sans indicateur
  if (loading) {
    return (
      <Link
        href="/admin/login"
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        <User className="h-4 w-4" />
        <span>Mon compte</span>
      </Link>
    )
  }

  // Si pas connecté (après chargement), afficher le point rouge
  if (!role) {
    return (
      <Link
        href="/admin/login"
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        <div className="relative">
          <User className="h-4 w-4" />
          {/* Point rouge indiquant "non connecté" */}
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
        </div>
        <span>Mon compte</span>
      </Link>
    )
  }

  // Si connecté, afficher le menu déroulant
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:text-primary transition-colors px-2"
        >
          <div className="relative">
            <User className="h-4 w-4" />
            {/* Point vert indiquant "connecté" */}
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <span>Mon compte</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 bg-background border-border shadow-lg">
        <DropdownMenuLabel className="flex items-start gap-3 pb-3">
          <User className="h-5 w-5 mt-0.5" />
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <p className="font-medium">Mon compte</p>
            {role && (
              <p className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                {isStaff && <Shield className="h-3 w-3" />}
                Rôle: {role === 'admin' ? 'Administrateur' : role === 'vendeur' ? 'Vendeur' : 'Client'}
              </p>
            )}
            {userEmail && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                <Mail className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{userEmail}</span>
              </p>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {isStaff && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                <LayoutDashboard className="h-4 w-4" />
                <span>Tableau de bord</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem asChild>
          <Link href="/admin/mon-compte" className="flex items-center gap-2 cursor-pointer">
            <Settings className="h-4 w-4" />
            <span>Paramètres du compte</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>{isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
