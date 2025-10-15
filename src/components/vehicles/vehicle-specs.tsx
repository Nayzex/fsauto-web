import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Vehicle } from '@/lib/types/vehicle'
import {
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Zap,
  Wind,
  Leaf,
  Palette,
  Car,
} from 'lucide-react'

interface VehicleSpecsProps {
  vehicle: Vehicle
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const specs = [
    {
      icon: Calendar,
      label: 'Année',
      value: vehicle.annee,
    },
    {
      icon: Gauge,
      label: 'Kilométrage',
      value: `${vehicle.kilometrage.toLocaleString('fr-FR')} km`,
    },
    {
      icon: Fuel,
      label: 'Carburant',
      value: vehicle.carburant,
    },
    {
      icon: Settings,
      label: 'Boîte de vitesse',
      value: vehicle.boite,
    },
    {
      icon: Zap,
      label: 'Puissance',
      value: vehicle.puissance_ch ? `${vehicle.puissance_ch} ch` : undefined,
    },
    {
      icon: Wind,
      label: 'Norme Euro',
      value: vehicle.norme_euro,
    },
    {
      icon: Leaf,
      label: 'Crit\'Air',
      value: vehicle.critair !== undefined ? vehicle.critair : undefined,
    },
    {
      icon: Palette,
      label: 'Couleur extérieure',
      value: vehicle.couleur_ext,
    },
    {
      icon: Palette,
      label: 'Couleur intérieure',
      value: vehicle.couleur_int,
    },
    {
      icon: Car,
      label: 'Carrosserie',
      value: vehicle.carrosserie,
    },
  ].filter((spec) => spec.value !== undefined && spec.value !== null && spec.value !== '')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Caractéristiques techniques</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((spec, index) => {
            const Icon = spec.icon
            return (
              <div key={index} className="flex items-start gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                  <dd className="font-medium">{spec.value}</dd>
                </div>
              </div>
            )
          })}
        </dl>
      </CardContent>
    </Card>
  )
}
