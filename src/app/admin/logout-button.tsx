'use client'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function LogoutButton() {
  const router = useRouter()
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut()
        toast.success('Déconnecté')
        router.replace('/admin/login')
      }}
      className="rounded-md border px-3 py-1.5"
    >
      Se déconnecter
    </button>
  )
}