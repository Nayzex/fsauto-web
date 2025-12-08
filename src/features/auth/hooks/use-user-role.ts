import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { UserRole } from '@/lib/auth'

export function useUserRole() {
  const [role, setRole] = useState<UserRole>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRole() {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          setRole(null)
          setLoading(false)
          return
        }

        // Appeler la RPC me_role()
        const { data, error } = await supabase.rpc('me_role')

        if (error) {
          console.error('Erreur lors de la récupération du rôle:', error)
          setRole(null)
        } else {
          setRole(data as UserRole)
        }
      } catch (error) {
        console.error('Erreur useUserRole:', error)
        setRole(null)
      } finally {
        setLoading(false)
      }
    }

    fetchRole()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchRole()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { role, loading, isStaff: role === 'admin' || role === 'vendeur', isAdmin: role === 'admin' }
}
