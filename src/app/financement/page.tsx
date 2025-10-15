import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LinkButton } from '@/components/ui/link-button'
import { CheckCircle, CreditCard, Calendar, Calculator } from 'lucide-react'

export const metadata = {
  title: 'Financement - FSauto',
  description: 'Solutions de financement LOA et crédit auto pour votre véhicule - FSauto',
}

export default function FinancementPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Financement automobile</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Des solutions flexibles adaptées à votre budget
        </p>
      </div>

      {/* Financing options */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* LOA */}
        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Location avec Option d'Achat (LOA)</CardTitle>
            <CardDescription>
              Louez votre véhicule avec la possibilité de l'acheter à la fin du contrat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Mensualités flexibles</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Durée de 24 à 72 mois</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Option d'achat en fin de contrat</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Apport de 0 à 30%</span>
              </li>
            </ul>
            <LinkButton href="/contact" className="w-full">
              En savoir plus
            </LinkButton>
          </CardContent>
        </Card>

        {/* Crédit classique */}
        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Crédit Auto</CardTitle>
            <CardDescription>
              Financez votre véhicule avec un crédit automobile classique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Vous devenez propriétaire immédiatement</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Taux compétitifs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Durée de 12 à 84 mois</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Possibilité de remboursement anticipé</span>
              </li>
            </ul>
            <LinkButton href="/contact" className="w-full">
              En savoir plus
            </LinkButton>
          </CardContent>
        </Card>

        {/* Paiement comptant */}
        <Card>
          <CardHeader>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Paiement Comptant</CardTitle>
            <CardDescription>
              Réglez votre véhicule en une seule fois et bénéficiez d'avantages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Aucun frais de dossier</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Remises possibles</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Aucun intérêt</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">Livraison rapide</span>
              </li>
            </ul>
            <LinkButton href="/contact" className="w-full">
              En savoir plus
            </LinkButton>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'aide pour choisir ?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour vous conseiller et trouver la solution de financement
            la plus adaptée à votre situation.
          </p>
          <LinkButton href="/contact" size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
            Contactez-nous
          </LinkButton>
        </CardContent>
      </Card>
    </div>
  )
}
