import Image from 'next/image'
import { LinkButton } from '@/components/ui/link-button'
import { SectionDivider } from '@/components/ui/section-divider'
import { Wrench, RefreshCw, Shield, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Nos Services - FSauto',
  description: 'Entretien, réparation, reprise, garantie et financement - FSauto à Paray-le-Monial',
}

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16 animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Des services complets pour vous accompagner dans l'achat, l'entretien et le financement de votre véhicule
        </p>
      </div>

      {/* Workshop Services */}
      <section id="entretien" className="mb-16 animate-slide-in-left">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4 group hover:bg-primary/20 hover:scale-110 transition-all duration-300">
              <Wrench className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Entretien et réparation</h2>
            <p className="text-muted-foreground mb-6">
              Notre atelier propose une gamme complète de services d'entretien et de réparation pour tous types de véhicules.
              Des révisions de routine aux réparations complexes, nos techniciens certifiés garantissent que votre véhicule
              reste en parfait état de fonctionnement.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Révision complète et vidange</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Freinage et suspension</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Diagnostic électronique</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Climatisation et chauffage</span>
              </li>
            </ul>
            <div className="flex sm:block">
              <LinkButton href="/contact" className="relative overflow-hidden group hover:scale-105 transition-all w-full sm:w-auto">
                <span className="relative z-10">Prendre rendez-vous</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </LinkButton>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted group hover:shadow-xl transition-all duration-300">
            <Image
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800"
              alt="Atelier de réparation"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <SectionDivider className="my-16" />

      {/* Trade-In */}
      <section id="reprise" className="mb-16 animate-slide-in-right">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative aspect-video rounded-lg overflow-hidden bg-muted group hover:shadow-xl transition-all duration-300">
            <Image
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800"
              alt="Reprise de véhicule"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4 group hover:bg-primary/20 hover:scale-110 transition-all duration-300">
              <RefreshCw className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Reprise de votre véhicule</h2>
            <p className="text-muted-foreground mb-6">
              Vous cherchez à améliorer votre véhicule actuel ? Nous proposons des valeurs de reprise compétitives
              pour votre ancien véhicule, facilitant ainsi l'acquisition de votre nouvelle voiture.
              Obtenez une évaluation rapide et équitable dès aujourd'hui.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Estimation gratuite et sans engagement</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Procédure simple et rapide</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Prix compétitifs du marché</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Tous types de véhicules acceptés</span>
              </li>
            </ul>
            <div className="flex sm:block">
              <LinkButton href="/reprise" className="relative overflow-hidden group hover:scale-105 transition-all w-full sm:w-auto">
                <span className="relative z-10">Obtenir une estimation</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider className="my-16" />

      {/* Warranty */}
      <section id="garantie" className="mb-16 animate-slide-in-left">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4 group hover:bg-primary/20 hover:scale-110 transition-all duration-300">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Garantie et tranquillité d'esprit</h2>
            <p className="text-muted-foreground mb-6">
              Conduisez en toute sérénité sachant que votre véhicule est protégé. Nos options de garantie offrent
              une couverture complète contre les réparations imprévues, vous assurant d'être couvert quand vous en avez le plus besoin.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Garantie jusqu'à 24 mois</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Couverture complète mécanique et électronique</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Service d'assistance 7j/7</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Véhicule de remplacement en cas de panne</span>
              </li>
            </ul>
            <div className="flex sm:block">
              <LinkButton href="/contact" className="relative overflow-hidden group hover:scale-105 transition-all w-full sm:w-auto">
                <span className="relative z-10">En savoir plus</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </LinkButton>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted group hover:shadow-xl transition-all duration-300">
            <Image
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800"
              alt="Garantie véhicule"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <SectionDivider className="my-16" />

      {/* Financing CTA */}
      <section className="bg-primary text-primary-foreground rounded-lg p-6 sm:p-12 text-center animate-scale-in hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Solutions de financement sur mesure</h2>
        <p className="text-base sm:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          Nous proposons des options de financement flexibles adaptées à votre budget. Location avec option d'achat (LOA),
          crédit auto classique, ou paiement comptant - nous travaillons avec vous pour trouver la meilleure solution.
        </p>
        <div className="flex justify-center">
          <LinkButton href="/financement" size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all relative overflow-hidden group w-full sm:w-auto">
            <span className="relative z-10">Découvrir nos offres de financement</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </LinkButton>
        </div>
      </section>
    </div>
  )
}
