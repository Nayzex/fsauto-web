import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LinkButton } from '@/components/ui/link-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VehicleGallery } from '@/components/vehicles/vehicle-gallery'
import { VehicleSpecs } from '@/components/vehicles/vehicle-specs'
import { VehicleActions } from '@/components/vehicles/vehicle-actions'
import { VehicleCard } from '@/components/vehicles/vehicle-card'
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
      <LinkButton href="/catalogue" variant="ghost" className="mb-6">
        <ChevronLeft className="h-4 w-4 mr-2" />
        Retour au catalogue
      </LinkButton>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left column: Gallery and details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <VehicleGallery
            images={vehicleData.images || []}
            alt={vehicleTitle}
          />

          {/* Description */}
          {vehicleData.description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{vehicleData.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Specs */}
          <VehicleSpecs vehicle={vehicleData} />

          {/* Options */}
          {vehicleData.options && vehicleData.options.length > 0 && (
            <Card>
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
            <Card>
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
          <Card className="sticky top-20">
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
          <Card id="contact-form">
            <CardHeader>
              <CardTitle>Contactez-nous</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="nom"
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
                    rows={4}
                    className="w-full rounded-lg border border-border px-3 py-2"
                    placeholder="J'accepte de recevoir des offres et informations de FSauto."
                  />
                </div>
                <Button type="submit" className="w-full">
                  Envoyer
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar vehicles */}
      {similar.length > 0 && (
        <section className="mt-16">
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
