'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Select } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface User {
  id: string
  email: string
  role: 'admin' | 'vendeur' | 'client'
}

interface UserRoleManagerProps {
  user: User
}

export function UserRoleManager({ user }: UserRoleManagerProps) {
  const [role, setRole] = useState(user.role)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRoleChange = async (newRole: string) => {
    if (newRole === role) return

    setLoading(true)

    try {
      const { data, error } = await supabase.rpc('admin_update_role', {
        target_uid: user.id,
        new_role: newRole,
      })

      if (error) throw error

      setRole(newRole as 'admin' | 'vendeur' | 'client')
      toast.success(`Rôle mis à jour : ${user.email} est maintenant ${newRole}`)
      router.refresh()
    } catch (error) {
      console.error('Erreur lors du changement de rôle:', error)
      toast.error('Erreur lors du changement de rôle')
      setRole(user.role) // Remettre l'ancien rôle en cas d'erreur
    } finally {
      setLoading(false)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'vendeur':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'client':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Select
      value={role}
      onChange={(e) => handleRoleChange(e.target.value)}
      disabled={loading}
      className={`text-sm font-medium rounded-full px-3 py-1 border-0 ${getRoleBadgeColor(role)}`}
    >
      <option value="client">Client</option>
      <option value="vendeur">Vendeur</option>
      <option value="admin">Admin</option>
    </Select>
  )
}
