import { redirect } from 'next/navigation'
import { getProfileRole } from '@/lib/auth'
import { getSupabaseServer } from '@/lib/supabaseServer'
import { LogoutButton } from './logout-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LinkButton } from '@/components/ui/link-button'
import { Car, Users, FileText, Settings } from 'lucide-react'

export default async function AdminHome() {
  const role = await getProfileRole()

  // Si pas connecté, rediriger vers la page de connexion
  if (!role) redirect('/admin/login')

  // Si connecté mais pas admin/vendeur (donc client), rediriger vers l'accueil
  if (!['admin', 'vendeur'].includes(role)) {
    redirect('/')
  }

  // Récupérer quelques statistiques
  const supabase = getSupabaseServer()
  const { count: vehiclesCount } = await supabase
    .from('vehicle')
    .select('*', { count: 'exact', head: true })

  const { count: onlineCount } = await supabase
    .from('vehicle')
    .select('*', { count: 'exact', head: true })
    .eq('statut', 'online')

  const { count: leadsCount } = await supabase
    .from('lead')
    .select('*', { count: 'exact', head: true })

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between animate-fade-in-down">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
          <p className="text-muted-foreground">Bienvenue dans le back-office FSauto</p>
        </div>
        <LogoutButton />
      </div>

      {/* Statistiques */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="animate-slide-in-left">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Véhicules total</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehiclesCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              {onlineCount || 0} en ligne
            </p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demandes de contact</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadsCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total des leads
            </p>
          </CardContent>
        </Card>

        <Card className="animate-slide-in-right">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Votre rôle</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{role}</div>
            <p className="text-xs text-muted-foreground">
              Accès back-office
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up">
        <Card className="hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Gestion des véhicules</CardTitle>
                <CardDescription>Ajouter et gérer les annonces</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex gap-3">
            <LinkButton href="/admin/vehicules/new" className="flex-1">
              Nouveau véhicule
            </LinkButton>
            <LinkButton href="/admin/vehicules" variant="outline" className="flex-1">
              Voir tout
            </LinkButton>
          </CardContent>
        </Card>

        {role === 'admin' && (
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Gestion des utilisateurs</CardTitle>
                  <CardDescription>Gérer les rôles et permissions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LinkButton href="/admin/users" className="w-full">
                Gérer les utilisateurs
              </LinkButton>
            </CardContent>
          </Card>
        )}

        {role === 'vendeur' && (
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Leads & Contacts</CardTitle>
                  <CardDescription>Voir les demandes de contact</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LinkButton href="/admin/leads" variant="outline" className="w-full">
                Voir les leads
              </LinkButton>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}