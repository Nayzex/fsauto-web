import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, FileText, Calculator, Car } from 'lucide-react'
import { RepriseForm } from '@/components/forms/reprise-form'

export const metadata = {
  title: 'Reprise de véhicule - FSauto',
  description: 'Faites reprendre votre ancien véhicule au meilleur prix - FSauto à Paray-le-Monial',
}

export default function ReprisePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Reprise de votre véhicule</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Obtenez une estimation gratuite et échangez votre ancien véhicule contre un nouveau
        </p>
      </div>

      {/* How it works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-down">Comment ça marche ?</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center animate-slide-in-left group">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">1. Remplissez le formulaire</h3>
            <p className="text-sm text-muted-foreground">
              Décrivez votre véhicule en quelques clics
            </p>
          </div>

          <div className="text-center animate-scale-in group">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">2. Estimation immédiate</h3>
            <p className="text-sm text-muted-foreground">
              Recevez une première estimation sous 24h
            </p>
          </div>

          <div className="text-center animate-scale-in group">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">3. Expertise du véhicule</h3>
            <p className="text-sm text-muted-foreground">
              Rendez-vous en concession pour l'expertise
            </p>
          </div>

          <div className="text-center animate-slide-in-right group">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">4. Validation finale</h3>
            <p className="text-sm text-muted-foreground">
              Confirmez l'offre et choisissez votre nouveau véhicule
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <Card className="animate-scale-in hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle>Demande d'estimation de reprise</CardTitle>
          </CardHeader>
          <CardContent>
            <RepriseForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
