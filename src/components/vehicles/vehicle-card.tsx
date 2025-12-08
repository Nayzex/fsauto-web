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
    <Card className="group overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] hover:-translate-y-1 duration-300">
      <Link href={`/voitures/${vehicle.slug}`}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={mainImage}
            alt={`${vehicle.marque} ${vehicle.modele}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={true}
          />
          {/* Overlay gradient au hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-2 translate-x-0 group-hover:-translate-x-1 transition-transform duration-300">
            {vehicle.prix_loa && (
              <Badge variant="default" className="bg-primary backdrop-blur-sm">
                LOA disponible
              </Badge>
            )}
            {vehicle.garantie && (
              <Badge variant="success" className="backdrop-blur-sm">
                Garantie
              </Badge>
            )}
            {vehicle.reprise_ok && (
              <Badge variant="secondary" className="backdrop-blur-sm">
                Reprise
              </Badge>
            )}
          </div>
          {/* Price badge */}
          <div className="absolute top-2 right-2 translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
            <Badge variant="default" className="bg-black/90 dark:bg-black/95 backdrop-blur-sm text-white text-lg px-3 py-1 group-hover:bg-primary group-hover:scale-110 transition-all">
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
          <button className="relative w-full rounded-lg border border-border bg-background px-4 py-2 font-medium transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg overflow-hidden group">
            <span className="relative z-10">Voir le véhicule</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>
        </CardFooter>
      </Link>
    </Card>
  )
}
