import { Suspense } from 'react'
import { VehicleCatalog } from './vehicle-catalog'

export const metadata = {
  title: 'Catalogue de véhicules d\'occasion - FSauto',
  description: 'Découvrez notre sélection de véhicules d\'occasion de qualité à Paray-le-Monial',
}

export default function CataloguePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Voitures d'occasion</h1>
        <p className="text-lg text-muted-foreground">
          Découvrez notre sélection de véhicules rigoureusement contrôlés et garantis
        </p>
      </div>

      <Suspense fallback={<div className="py-12 text-center">Chargement...</div>}>
        <VehicleCatalog />
      </Suspense>
    </div>
  )
}
