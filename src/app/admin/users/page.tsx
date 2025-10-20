import { redirect } from 'next/navigation'
import { getProfileRole } from '@/lib/auth'
import { getSupabaseServer } from '@/lib/supabaseServer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserRoleManager } from './user-role-manager'
import { ChevronLeft } from 'lucide-react'
import { LinkButton } from '@/components/ui/link-button'

export const metadata = {
  title: 'Gestion des utilisateurs - Admin FSauto',
  description: 'Gérer les utilisateurs et leurs rôles',
}

interface User {
  id: string
  email: string
  display_name: string | null
  role: 'admin' | 'vendeur' | 'client'
  created_at: string
  last_sign_in_at: string | null
}

export default async function UsersPage() {
  const role = await getProfileRole()

  // Seuls les admins peuvent accéder à cette page
  if (!role) redirect('/admin/login')
  if (role !== 'admin') {
    return (
      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Accès refusé</CardTitle>
            <CardDescription>
              Seuls les administrateurs peuvent gérer les utilisateurs.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    )
  }

  // Récupérer la liste des utilisateurs via RPC
  const supabase = getSupabaseServer()
  const { data: users, error } = await supabase.rpc('admin_list_profiles')

  if (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
  }

  const usersList: User[] = (users || []).map(user => ({
    id: user.id,
    email: user.email || '',
    display_name: null,
    role: user.role as 'admin' | 'vendeur' | 'client',
    created_at: user.created_at || new Date().toISOString(),
    last_sign_in_at: null
  }))

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in-down">
        <LinkButton href="/admin" variant="ghost" className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Retour au tableau de bord
        </LinkButton>
        <h1 className="text-3xl font-bold mb-2">Gestion des utilisateurs</h1>
        <p className="text-muted-foreground">
          Gérer les rôles et permissions des utilisateurs
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="animate-slide-in-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersList.length}</div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Administrateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersList.filter(u => u.role === 'admin').length}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-in-right">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendeurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersList.filter(u => u.role === 'vendeur').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des utilisateurs */}
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
          <CardDescription>
            Cliquez sur un rôle pour le modifier
          </CardDescription>
        </CardHeader>
        <CardContent>
          {usersList.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Aucun utilisateur trouvé
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Email</th>
                    <th className="text-left p-3 font-medium">Nom</th>
                    <th className="text-left p-3 font-medium">Rôle</th>
                    <th className="text-left p-3 font-medium">Inscription</th>
                    <th className="text-left p-3 font-medium">Dernière connexion</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.display_name || '-'}</td>
                      <td className="p-3">
                        <UserRoleManager user={user} />
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {user.last_sign_in_at
                          ? new Date(user.last_sign_in_at).toLocaleDateString('fr-FR')
                          : 'Jamais'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
