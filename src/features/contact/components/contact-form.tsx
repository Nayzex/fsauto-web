'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { submitContactForm } from '../actions/contact'
import { toast } from 'sonner'

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formElement = e.currentTarget
    const formData = new FormData(formElement)

    const data = {
      nom: formData.get('nom'),
      email: formData.get('email'),
      tel: formData.get('tel'),
      sujet: formData.get('sujet'),
      message: formData.get('message'),
      consent: formData.get('consent') === 'on',
    }

    const result = await submitContactForm(data)

    if (result.success) {
      toast.success(result.message)
      formElement.reset()
    } else {
      toast.error(result.message)
    }

    setIsLoading(false)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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

      <div>
        <label htmlFor="sujet" className="block text-sm font-medium mb-2">
          Sujet *
        </label>
        <select
          id="sujet"
          name="sujet"
          required
          className="w-full rounded-lg border border-border px-3 py-2"
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="achat">Achat d'un véhicule</option>
          <option value="reprise">Reprise de véhicule</option>
          <option value="financement">Financement</option>
          <option value="entretien">Entretien / Réparation</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-lg border border-border px-3 py-2"
          placeholder="Votre message..."
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

      <Button type="submit" className="w-full relative overflow-hidden group hover:shadow-lg hover:shadow-primary/50 transition-all" disabled={isLoading}>
        <span className="relative z-10">{isLoading ? 'Envoi...' : 'Envoyer le message'}</span>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </Button>
    </form>
  )
}
