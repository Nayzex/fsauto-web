'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Connexion côté client
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
        setLoading(false)
        return
      }

      // 2. Définir la session côté serveur via API route
      const response = await fetch('/api/auth/set-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token,
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la définition de la session serveur')
      }

      // 3. Vérifier le rôle
      const { data: roleData } = await supabase.rpc('me_role')

      toast.success('Connecté')

      // 4. Rediriger selon le rôle avec navigation complète
      if (roleData === 'admin' || roleData === 'vendeur') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      toast.error('Erreur lors de la connexion')
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">Connexion</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="w-full rounded-md border p-2 bg-background text-foreground"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Mot de passe"
          className="w-full rounded-md border p-2 bg-background text-foreground"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500 disabled:opacity-60"
        >
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </main>
  )
}