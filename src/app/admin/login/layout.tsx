import { redirect } from 'next/navigation'
import { getProfileRole } from '@/lib/auth'

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Vérifier si l'utilisateur est déjà connecté
  const role = await getProfileRole()

  // Si déjà connecté, rediriger selon le rôle
  if (role) {
    if (role === 'admin' || role === 'vendeur') {
      redirect('/admin')
    } else {
      redirect('/')
    }
  }

  // Sinon, afficher la page de login
  return <>{children}</>
}
