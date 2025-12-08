'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function VehicleContactForm({ vehicleTitle }: { vehicleTitle: string }) {
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
      message: `Intéressé par: ${vehicleTitle}\n\n${formData.get('message')}`,
      sujet: 'achat',
      consent: true,
    }

    try {
      // Import the server action
      const { submitContactForm } = await import('../actions/contact')
      const result = await submitContactForm(data)

      if (result.success) {
        toast.success(result.message)
        formElement.reset()
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    }

    setIsLoading(false)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nom" className="block text-sm font-medium mb-1">
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
        <label htmlFor="email" className="block text-sm font-medium mb-1">
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
        <label htmlFor="tel" className="block text-sm font-medium mb-1">
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
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-border px-3 py-2"
          placeholder="J'accepte de recevoir des offres et informations de FSauto."
        />
      </div>
      <Button type="submit" className="w-full relative overflow-hidden group hover:shadow-lg hover:shadow-primary/50 transition-all" disabled={isLoading}>
        <span className="relative z-10">{isLoading ? 'Envoi...' : 'Envoyer'}</span>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </Button>
    </form>
  )
}
