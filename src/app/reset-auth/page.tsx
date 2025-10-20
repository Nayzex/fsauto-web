'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ResetAuthPage() {
  const [status, setStatus] = useState('Nettoyage en cours...')

  useEffect(() => {
    async function reset() {
      try {
        // 1. Déconnexion côté client
        await supabase.auth.signOut()

        // 2. Appel de l'API pour nettoyer les cookies serveur
        await fetch('/api/auth/logout', {
          method: 'POST'
        })

        setStatus('✅ Cookies nettoyés ! Redirection...')

        // 3. Attendre un peu puis rediriger
        setTimeout(() => {
          window.location.href = '/admin/login'
        }, 1500)
      } catch (error) {
        console.error('Erreur:', error)
        setStatus('❌ Erreur lors du nettoyage')
      }
    }

    reset()
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Réinitialisation de l'authentification</h1>
        <p className="text-lg">{status}</p>
        <p className="text-sm text-muted-foreground mt-4">
          Cette page nettoie tous les cookies d'authentification
        </p>
      </div>
    </main>
  )
}
