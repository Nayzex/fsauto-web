import { LinkButton } from '@/components/ui/link-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { VehicleCard } from '@/components/vehicles/vehicle-card'
import { getSupabaseServer } from '@/lib/supabaseServer'
import type { Vehicle } from '@/lib/types/vehicle'
import { ArrowRight, Wrench, RefreshCw, Shield, Star } from 'lucide-react'

export default async function HomePage() {
  // Fetch recent vehicles
  const supabase = getSupabaseServer()
  const { data: vehicles } = await supabase
    .from('vehicle')
    .select('*, images:vehicle_image(*)')
    .eq('statut', 'online')
    .order('published_at', { ascending: false })
    .limit(4)

  const recentVehicles = (vehicles || []) as Vehicle[]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black to-gray-900 dark:from-gray-950 dark:to-black text-white overflow-hidden">
        {/* Background avec parallax subtil */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200')] bg-cover bg-center animate-hero-fade" />

        {/* Overlay gradient animé */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 animate-glow" />

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down">
              Trouvez la voiture de vos rêves
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in-up">
              Découvrez notre large sélection de véhicules d'occasion, rigoureusement sélectionnés et garantis pour votre tranquillité d'esprit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
              <LinkButton href="/catalogue" size="lg" className="text-lg group transition-smooth hover:scale-105 hover:shadow-2xl hover:shadow-primary/50">
                Consulter le catalogue
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </LinkButton>
              <LinkButton href="/contact" size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 text-white border-white/20 transition-smooth hover:scale-105">
                Nous contacter
              </LinkButton>
            </div>
          </div>
        </div>

        {/* Décoration: points flottants */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float animate-delay-300" />
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-down">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Des services adaptés à vos besoins
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nous offrons une gamme complète de services pour vous accompagner dans l'achat et l'entretien de votre véhicule.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1: Workshop */}
            <Card className="text-center group hover:shadow-xl transition-all duration-300 animate-slide-in-left">
              <CardHeader>
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all group-hover:scale-110 duration-300">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Entretien et réparation</CardTitle>
                <CardDescription>
                  Nos techniciens qualifiés assurent l'entretien et la réparation de votre véhicule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LinkButton href="/services#entretien" variant="link" className="text-primary group relative overflow-hidden hover:scale-105 transition-all">
                  <span className="relative z-10">En savoir plus</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                </LinkButton>
              </CardContent>
            </Card>

            {/* Service 2: Trade-in */}
            <Card className="text-center group hover:shadow-xl transition-all duration-300 animate-scale-in">
              <CardHeader>
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all group-hover:scale-110 duration-300">
                  <RefreshCw className="h-8 w-8 text-primary group-hover:rotate-180 transition-transform duration-500" />
                </div>
                <CardTitle>Reprise de votre véhicule</CardTitle>
                <CardDescription>
                  Nous offrons des valeurs de reprise compétitives pour faciliter l'acquisition de votre nouveau véhicule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LinkButton href="/reprise" variant="link" className="text-primary group relative overflow-hidden hover:scale-105 transition-all">
                  <span className="relative z-10">Obtenir une estimation</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                </LinkButton>
              </CardContent>
            </Card>

            {/* Service 3: Warranty */}
            <Card className="text-center group hover:shadow-xl transition-all duration-300 animate-slide-in-right">
              <CardHeader>
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all group-hover:scale-110 duration-300">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Garantie et financement</CardTitle>
                <CardDescription>
                  Profitez d'une garantie complète et de solutions de financement sur mesure adaptées à votre budget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LinkButton href="/financement" variant="link" className="text-primary group relative overflow-hidden hover:scale-105 transition-all">
                  <span className="relative z-10">Découvrir nos offres</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                </LinkButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ce que disent nos clients
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-base">Sophie Martin</CardTitle>
                <CardDescription>15/12/2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  "J'ai acheté ma voiture chez FSauto et je suis très satisfait du service. L'équipe est professionnelle et à l'écoute."
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <CardTitle className="text-base">Jean Dubois</CardTitle>
                <CardDescription>20/12/2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  "Bon accueil et large choix de véhicules. Le processus d'achat a été simple et rapide."
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-base">Isabelle Leclerc</CardTitle>
                <CardDescription>02/01/2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  "Excellent service, personnel compétent et sympathique. Je recommande vivement!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Vehicles Section */}
      {recentVehicles.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ajout récent
                </h2>
                <p className="text-lg text-muted-foreground">
                  Découvrez nos dernières annonces
                </p>
              </div>
              <LinkButton href="/catalogue" variant="outline">
                Voir tout le catalogue
                <ArrowRight className="ml-2 h-4 w-4" />
              </LinkButton>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Votre confiance, notre priorité
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Garantie jusqu'à 24 mois, reprise de votre ancien véhicule, financement LOA, et plus encore.
          </p>
          <LinkButton href="/contact" size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
            En savoir plus
            <ArrowRight className="ml-2 h-5 w-5" />
          </LinkButton>
        </div>
      </section>
    </div>
  )
}
