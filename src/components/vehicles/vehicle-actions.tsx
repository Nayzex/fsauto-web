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
      <Button onClick={handleCall} className="w-full flex items-center justify-center gap-2" size="lg">
        <Phone className="h-4 w-4 flex-shrink-0" />
        <span>Appeler</span>
      </Button>
      <Button onClick={handleEmail} variant="outline" className="w-full flex items-center justify-center gap-2" size="lg">
        <Mail className="h-4 w-4 flex-shrink-0" />
        <span>E-mail</span>
      </Button>
      <Button onClick={handleTestDrive} variant="outline" className="w-full flex flex-col items-center justify-center gap-1 h-auto py-3" size="lg">
        <Calendar className="h-4 w-4 flex-shrink-0" />
        <span className="text-xs leading-tight text-center">Demander un essai</span>
      </Button>
      <Button onClick={handleTradeIn} variant="outline" className="w-full flex flex-col items-center justify-center gap-1 h-auto py-3" size="lg">
        <RefreshCw className="h-4 w-4 flex-shrink-0" />
        <span className="text-xs leading-tight text-center">Obtenir une reprise</span>
      </Button>
    </div>
  )
}
