import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Vehicle } from '@/lib/types/vehicle'
import { Calendar, Gauge, Fuel, Settings } from 'lucide-react'

interface VehicleCardProps {
  vehicle: Vehicle
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const mainImage = vehicle.images?.[0]?.url || '/placeholder-car.jpg'
  const priceFormatted = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(vehicle.prix || 0)

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/voitures/${vehicle.slug}`}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={mainImage}
            alt={`${vehicle.marque} ${vehicle.modele}`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-2">
            {vehicle.prix_loa && (
              <Badge variant="default" className="bg-primary">
                LOA disponible
              </Badge>
            )}
            {vehicle.garantie && (
              <Badge variant="success">
                Garantie
              </Badge>
            )}
            {vehicle.reprise_ok && (
              <Badge variant="secondary">
                Reprise
              </Badge>
            )}
          </div>
          {/* Price badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="bg-black/80 text-white text-lg px-3 py-1">
              {priceFormatted}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title */}
          <h3 className="font-bold text-lg mb-2 line-clamp-1">
            {vehicle.marque} {vehicle.modele}
          </h3>
          {vehicle.version && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
              {vehicle.version}
            </p>
          )}

          {/* Specs */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            {vehicle.annee && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{vehicle.annee}</span>
              </div>
            )}
            {vehicle.kilometrage != null && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="h-4 w-4" />
                <span>{vehicle.kilometrage.toLocaleString('fr-FR')} km</span>
              </div>
            )}
            {vehicle.carburant && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Fuel className="h-4 w-4" />
                <span>{vehicle.carburant}</span>
              </div>
            )}
            {vehicle.boite && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Settings className="h-4 w-4" />
                <span>{vehicle.boite}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <button className="w-full rounded-lg border border-border bg-background px-4 py-2 font-medium transition-colors hover:bg-muted">
            Voir le véhicule
          </button>
        </CardFooter>
      </Link>
    </Card>
  )
}
