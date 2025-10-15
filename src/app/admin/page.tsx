import { redirect } from 'next/navigation'
import { getSupabaseServer } from '@/lib/supabaseServer'
import { LogoutButton } from './logout-button'

async function getProfileRole() {
  const supabase = getSupabaseServer()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { role: null }
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()
  if (error) return { role: null }
  return { role: data.role as 'admin' | 'vendeur' | 'client' | null }
}

export default async function AdminHome() {
  const { role } = await getProfileRole()
  if (!role) redirect('/admin/login')
  if (!['admin', 'vendeur'].includes(role)) {
    return <main className="p-6">Accès refusé.</main>
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Back-office FSauto</h1>
        <LogoutButton />
      </div>

      <ul className="list-disc pl-5">
        <li><a className="text-red-600 underline" href="/admin/vehicules/new">Créer une annonce</a></li>
        <li><a className="text-red-600 underline" href="/admin/vehicules">Voir les annonces</a> (à venir)</li>
      </ul>
    </main>
  )
}