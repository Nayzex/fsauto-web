import { useEffect, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'

const INACTIVITY_TIMEOUT = 10 * 60 * 1000 // 10 minutes en millisecondes

export function useSessionTimeout() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimer = useCallback(() => {
    // Effacer le timer existant
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Créer un nouveau timer
    timeoutRef.current = setTimeout(async () => {
      // Déconnecter l'utilisateur après 10 minutes d'inactivité
      const { error } = await supabase.auth.signOut()
      if (!error) {
        toast.info('Session expirée après 10 minutes d\'inactivité')
        window.location.href = '/admin/login'
      }
    }, INACTIVITY_TIMEOUT)
  }, [])

  useEffect(() => {
    let events: string[] = []
    let isActive = false

    // Vérifier si l'utilisateur est connecté
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return // Pas de session, pas besoin de timer

      isActive = true

      // Démarrer le timer au chargement
      resetTimer()

      // Événements qui réinitialisent le timer (activité utilisateur)
      events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click']

      events.forEach(event => {
        document.addEventListener(event, resetTimer)
      })
    })

    // Nettoyage
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (isActive) {
        events.forEach(event => {
          document.removeEventListener(event, resetTimer)
        })
      }
    }
  }, [resetTimer])
}
