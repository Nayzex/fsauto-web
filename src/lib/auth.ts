import { getSupabaseServer } from './supabaseServer'

export type UserRole = 'admin' | 'vendeur' | 'client' | null

/**
 * Récupère le rôle de l'utilisateur connecté côté serveur
 * Utilise la RPC me_role() créée dans Supabase
 */
export async function getProfileRole(): Promise<UserRole> {
  try {
    const supabase = getSupabaseServer()

    // Utiliser getUser() pour authentifier correctement l'utilisateur
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      console.log('[getProfileRole] Pas d\'utilisateur. Error:', userError?.message)
      return null
    }

    console.log('[getProfileRole] Utilisateur trouvé:', user.id)

    // Appeler la RPC me_role()
    const { data, error } = await supabase.rpc('me_role')

    if (error) {
      console.error('[getProfileRole] Erreur RPC me_role:', error)
      return null
    }

    console.log('[getProfileRole] Rôle récupéré:', data)
    return data as UserRole
  } catch (error) {
    console.error('[getProfileRole] Erreur:', error)
    return null
  }
}

/**
 * Vérifie si l'utilisateur est staff (admin ou vendeur)
 */
export async function isStaff(): Promise<boolean> {
  const role = await getProfileRole()
  return role === 'admin' || role === 'vendeur'
}

/**
 * Vérifie si l'utilisateur est admin
 */
export async function isAdmin(): Promise<boolean> {
  const role = await getProfileRole()
  return role === 'admin'
}
