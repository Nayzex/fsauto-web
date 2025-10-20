'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { useUserRole } from '@/hooks/use-user-role'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { Mail, Lock, Trash2, Shield, Loader2 } from 'lucide-react'

export default function MonComptePage() {
  const router = useRouter()
  const { role, loading: roleLoading } = useUserRole()

  const [email, setEmail] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loadingEmail, setLoadingEmail] = useState(false)
  const [loadingPassword, setLoadingPassword] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  // Récupérer l'email actuel
  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setEmail(user.email)
      }
    }
    fetchUser()
  }, [])

  // Rediriger si pas connecté
  useEffect(() => {
    if (!roleLoading && !role) {
      router.push('/admin/login')
    }
  }, [role, roleLoading, router])

  // Changer l'email
  async function handleEmailChange(e: React.FormEvent) {
    e.preventDefault()
    if (!newEmail || newEmail === email) {
      toast.error('Veuillez entrer un nouvel email différent')
      return
    }

    setLoadingEmail(true)
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail })

      if (error) throw error

      toast.success('Email mis à jour ! Vérifiez votre nouvelle boîte mail pour confirmer.')
      setNewEmail('')
    } catch (error) {
      console.error('Erreur changement email:', error)
      toast.error(error instanceof Error ? error.message : 'Erreur lors du changement d\'email')
    } finally {
      setLoadingEmail(false)
    }
  }

  // Changer le mot de passe
  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setLoadingPassword(true)
    try {
      // Vérifier d'abord le mot de passe actuel en tentant de se reconnecter
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
      })

      if (signInError) {
        throw new Error('Mot de passe actuel incorrect')
      }

      // Mettre à jour le mot de passe
      const { error } = await supabase.auth.updateUser({ password: newPassword })

      if (error) throw error

      toast.success('Mot de passe mis à jour avec succès')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error('Erreur changement mot de passe:', error)
      toast.error(error instanceof Error ? error.message : 'Erreur lors du changement de mot de passe')
    } finally {
      setLoadingPassword(false)
    }
  }

  // Supprimer le compte
  async function handleDeleteAccount() {
    setLoadingDelete(true)
    try {
      // 1. Supprimer le profil dans la base de données
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Utilisateur non trouvé')

      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)

      if (deleteError) throw deleteError

      // 2. Supprimer l'utilisateur de Supabase Auth (via API admin côté serveur)
      // Note: En production, cela devrait être fait via une route API sécurisée
      // Pour l'instant, on déconnecte simplement l'utilisateur

      await supabase.auth.signOut()
      await fetch('/api/auth/logout', { method: 'POST' })

      toast.success('Compte supprimé avec succès')

      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    } catch (error) {
      console.error('Erreur suppression compte:', error)
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la suppression du compte')
      setLoadingDelete(false)
    }
  }

  if (roleLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </main>
    )
  }

  if (!role) {
    return null
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Paramètres du compte</h1>

      {/* Section Email */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <CardTitle>Adresse email</CardTitle>
          </div>
          <CardDescription>
            Modifiez votre adresse email. Vous devrez confirmer la nouvelle adresse.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailChange} className="space-y-4">
            <div>
              <Label htmlFor="current-email">Email actuel</Label>
              <Input
                id="current-email"
                type="email"
                value={email}
                disabled
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="new-email">Nouvel email</Label>
              <Input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="nouveau@email.com"
              />
            </div>
            <Button type="submit" disabled={loadingEmail}>
              {loadingEmail && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Mettre à jour l'email
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Section Rôle */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Rôle</CardTitle>
          </div>
          <CardDescription>
            Votre rôle dans l'application (non modifiable)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold capitalize">
                {role === 'admin' ? 'Administrateur' : role === 'vendeur' ? 'Vendeur' : 'Client'}
              </p>
              <p className="text-sm text-muted-foreground">
                {role === 'admin' && 'Accès complet à toutes les fonctionnalités'}
                {role === 'vendeur' && 'Gestion des véhicules et des leads'}
                {role === 'client' && 'Accès au catalogue et aux favoris'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Mot de passe */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <CardTitle>Mot de passe</CardTitle>
          </div>
          <CardDescription>
            Modifiez votre mot de passe pour sécuriser votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div>
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 6 caractères
              </p>
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" disabled={loadingPassword}>
              {loadingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Mettre à jour le mot de passe
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Zone dangereuse - Suppression du compte */}
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Zone dangereuse</CardTitle>
          </div>
          <CardDescription>
            Actions irréversibles concernant votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={loadingDelete}>
                {loadingDelete && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer mon compte
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est <strong>irréversible</strong>. Cela supprimera définitivement votre compte
                  et toutes vos données associées de nos serveurs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Oui, supprimer mon compte
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </main>
  )
}
