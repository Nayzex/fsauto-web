'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { submitRepriseForm } from '@/app/actions/contact'
import { toast } from 'sonner'

export function RepriseForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formElement = e.currentTarget
    const formData = new FormData(formElement)

    const data = {
      marque: formData.get('marque'),
      modele: formData.get('modele'),
      annee: parseInt(formData.get('annee') as string),
      kilometrage: parseInt(formData.get('kilometrage') as string),
      carburant: formData.get('carburant'),
      boite: formData.get('boite'),
      etat: formData.get('etat'),
      commentaire: formData.get('commentaire'),
      nom: formData.get('nom'),
      email: formData.get('email'),
      tel: formData.get('tel'),
      consent: formData.get('consent') === 'on',
    }

    const result = await submitRepriseForm(data)

    if (result.success) {
      toast.success(result.message)
      formElement.reset()
    } else {
      toast.error(result.message)
    }

    setIsLoading(false)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="marque" className="block text-sm font-medium mb-2">
            Marque *
          </label>
          <input
            type="text"
            id="marque"
            name="marque"
            required
            className="w-full rounded-lg border border-border px-3 py-2"
            placeholder="Ex: Renault"
          />
        </div>

        <div>
          <label htmlFor="modele" className="block text-sm font-medium mb-2">
            Modèle *
          </label>
          <input
            type="text"
            id="modele"
            name="modele"
            required
            className="w-full rounded-lg border border-border px-3 py-2"
            placeholder="Ex: Clio"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="annee" className="block text-sm font-medium mb-2">
            Année *
          </label>
          <input
            type="number"
            id="annee"
            name="annee"
            required
            className="w-full rounded-lg border border-border px-3 py-2"
            placeholder="Ex: 2020"
          />
        </div>

        <div>
          <label htmlFor="kilometrage" className="block text-sm font-medium mb-2">
            Kilométrage *
          </label>
          <input
            type="number"
            id="kilometrage"
            name="kilometrage"
            required
            className="w-full rounded-lg border border-border px-3 py-2"
            placeholder="Ex: 50000"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="carburant" className="block text-sm font-medium mb-2">
            Carburant *
          </label>
          <select
            id="carburant"
            name="carburant"
            required
            className="w-full rounded-lg border border-border px-3 py-2"
          >
            <option value="">Sélectionnez</option>
            <option value="Essence">Essence</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybride">Hybride</option>
            <option value="Électrique">Électrique</option>
            <option value="GPL">GPL</option>
          </select>
        </div>

        <div>
          <label htmlFor="boite" className="block text-sm font-medium mb-2">
            Boîte de vitesse *
          </label>
          <select
            id="boite"
            name="boite"
            required
            className="w-full rounded-lg border border-border px-3 py-2"
          >
            <option value="">Sélectionnez</option>
            <option value="Manuelle">Manuelle</option>
            <option value="Automatique">Automatique</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="etat" className="block text-sm font-medium mb-2">
          État général du véhicule *
        </label>
        <select
          id="etat"
          name="etat"
          required
          className="w-full rounded-lg border border-border px-3 py-2"
        >
          <option value="">Sélectionnez</option>
          <option value="Excellent">Excellent</option>
          <option value="Très bon">Très bon</option>
          <option value="Bon">Bon</option>
          <option value="Moyen">Moyen</option>
        </select>
      </div>

      <div>
        <label htmlFor="commentaire" className="block text-sm font-medium mb-2">
          Informations complémentaires
        </label>
        <textarea
          id="commentaire"
          name="commentaire"
          rows={4}
          className="w-full rounded-lg border border-border px-3 py-2"
          placeholder="Options, état particulier, historique d'entretien..."
        />
      </div>

      <hr />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium mb-2">
            Nom *
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
            className="w-full rounded-lg border border-border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg border border-border px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="tel" className="block text-sm font-medium mb-2">
          Téléphone *
        </label>
        <input
          type="tel"
          id="tel"
          name="tel"
          required
          className="w-full rounded-lg border border-border px-3 py-2"
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          className="mt-1"
        />
        <label htmlFor="consent" className="text-sm text-muted-foreground">
          J'accepte que mes données soient utilisées pour me recontacter concernant ma demande *
        </label>
      </div>

      <Button type="submit" className="w-full relative overflow-hidden group hover:shadow-lg hover:shadow-primary/50 transition-all" size="lg" disabled={isLoading}>
        <span className="relative z-10">{isLoading ? 'Traitement...' : 'Obtenir mon estimation gratuite'}</span>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </Button>
    </form>
  )
}
