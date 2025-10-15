'use client'

import { Button } from '@/components/ui/button'
import { Phone, Mail, Calendar, RefreshCw } from 'lucide-react'

interface VehicleActionsProps {
  vehicleTitle: string
}

export function VehicleActions({ vehicleTitle }: VehicleActionsProps) {
  const handleCall = () => {
    window.location.href = 'tel:0641164746'
  }

  const handleEmail = () => {
    window.location.href = `mailto:contact@fsauto.fr?subject=Demande d'information - ${vehicleTitle}`
  }

  const handleTestDrive = () => {
    // Scroll to contact form
    const contactForm = document.getElementById('contact-form')
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleTradeIn = () => {
    // Scroll to contact form
    const contactForm = document.getElementById('contact-form')
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button onClick={handleCall} className="w-full" size="lg">
        <Phone className="h-5 w-5" />
        Appeler
      </Button>
      <Button onClick={handleEmail} variant="outline" className="w-full" size="lg">
        <Mail className="h-5 w-5" />
        E-mail
      </Button>
      <Button onClick={handleTestDrive} variant="outline" className="w-full" size="lg">
        <Calendar className="h-5 w-5" />
        Demander un essai
      </Button>
      <Button onClick={handleTradeIn} variant="outline" className="w-full" size="lg">
        <RefreshCw className="h-5 w-5" />
        Obtenir une reprise
      </Button>
    </div>
  )
}
