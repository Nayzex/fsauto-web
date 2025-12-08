import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { LinkButton } from '@/components/ui/link-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VehicleGallery } from '@/features/vehicle-detail/components/vehicle-gallery'
import { VehicleSpecs } from '@/features/vehicle-detail/components/vehicle-specs'
import { VehicleActions } from '@/features/vehicle-detail/components/vehicle-actions'
import { VehicleCard } from '@/features/catalogue/components/vehicle-card'
import { VehicleContactForm } from '@/features/contact/components/vehicle-contact-form'
import { getSupabaseServer } from '@/lib/supabaseServer'
import type { Vehicle } from '@/lib/types/vehicle'
import { ChevronLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = getSupabaseServer()

  // Fetch vehicle
  const { data: vehicle } = await supabase
    .from('vehicle')
    .select('*, images:vehicle_image(*)')
    .eq('slug', slug)
    .eq('statut', 'online')
    .order('ordre', { referencedTable: 'vehicle_image', ascending: true })
    .single()

  if (!vehicle) {
    notFound()
  }

  const vehicleData = vehicle as Vehicle

  // Fetch similar vehicles
  const { data: similarVehicles } = await supabase
    .from('vehicle')
    .select('*, images:vehicle_image(*)')
    .eq('statut', 'online')
    .eq('marque', vehicleData.marque)
    .neq('id', vehicleData.id)
    .limit(4)

  const similar = (similarVehicles || []) as Vehicle[]

  const priceFormatted = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(vehicleData.prix)

  const vehicleTitle = `${vehicleData.marque} ${vehicleData.modele}${vehicleData.version ? ` ${vehicleData.version}` : ''}`

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <LinkButton href="/catalogue" variant="ghost" className="mb-6 animate-fade-in">
        <ChevronLeft className="h-4 w-4 mr-2" />
        Retour au catalogue
      </LinkButton>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left column: Gallery and details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <div className="animate-slide-in-left">
            <VehicleGallery
              images={vehicleData.images || []}
              alt={vehicleTitle}
            />
          </div>

          {/* Description */}
          {vehicleData.description && (
            <Card className="animate-fade-in-up hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{vehicleData.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Specs */}
          <div className="animate-fade-in-up animate-delay-100">
            <VehicleSpecs vehicle={vehicleData} />
          </div>

          {/* Options */}
          {vehicleData.options && vehicleData.options.length > 0 && (
            <Card className="animate-fade-in-up animate-delay-200 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Options et équipements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-2">
                  {vehicleData.options.map((option, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm">{option}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Maintenance history */}
          {vehicleData.historique_entretien && (
            <Card className="animate-fade-in-up animate-delay-300 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Historique d'entretien</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{vehicleData.historique_entretien}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column: Price and actions */}
        <div className="space-y-6">
          {/* Price card */}
          <Card className="animate-slide-in-right hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{vehicleTitle}</h1>
                <p className="text-sm text-muted-foreground">
                  {vehicleData.annee} • {vehicleData.kilometrage.toLocaleString('fr-FR')} km
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-4">
                {vehicleData.prix_loa && (
                  <Badge variant="default">LOA disponible</Badge>
                )}
                {vehicleData.garantie && (
                  <Badge variant="success">Garantie {vehicleData.garantie}</Badge>
                )}
                {vehicleData.reprise_ok && (
                  <Badge variant="secondary">Reprise possible</Badge>
                )}
                {vehicleData.critair !== undefined && (
                  <Badge variant="outline">Crit'Air {vehicleData.critair}</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Price */}
              <div>
                <p className="text-3xl font-bold text-primary">{priceFormatted}</p>
                {vehicleData.prix_loa && (
                  <p className="text-sm text-muted-foreground mt-1">
                    LOA disponible à partir de{' '}
                    <span className="font-semibold">
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(vehicleData.prix_loa)}
                      /mois
                    </span>
                  </p>
                )}
              </div>

              {/* Actions */}
              <VehicleActions vehicleTitle={vehicleTitle} />
            </CardContent>
          </Card>

          {/* Contact form */}
          <Card id="contact-form" className="animate-scale-in animate-delay-100 hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle>Contactez-nous</CardTitle>
            </CardHeader>
            <CardContent>
              <VehicleContactForm vehicleTitle={vehicleTitle} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar vehicles */}
      {similar.length > 0 && (
        <section className="mt-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-8">Véhicules similaires</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similar.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
