'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Vehicle } from '@/lib/types/vehicle'
import { X } from 'lucide-react'

interface VehicleFiltersProps {
  vehicles: Vehicle[]
  onFilterChange: (filters: Record<string, string[] | number | string | undefined>) => void
  initialSearch?: string | null
  isMobile?: boolean
}

export function VehicleFilters({ vehicles, onFilterChange, initialSearch, isMobile = false }: VehicleFiltersProps) {
  const [filters, setFilters] = useState<Record<string, string[] | number | string | undefined>>({
    marque: [],
    modele: [],
    carburant: [],
    boite: [],
    critair: [],
    prix_min: '',
    prix_max: '',
    annee_min: '',
    annee_max: '',
    km_min: '',
    km_max: '',
  })

  const [searchApplied, setSearchApplied] = useState(false)

  // Appliquer automatiquement le filtre si on a une recherche
  useEffect(() => {
    if (initialSearch && vehicles.length > 0 && !searchApplied) {
      const searchLower = initialSearch.toLowerCase()
      const uniqueMarques = Array.from(new Set(vehicles.map(v => v.marque)))
      const matchingMarque = uniqueMarques.find(m => m.toLowerCase() === searchLower)

      if (matchingMarque) {
        const newFilters = { ...filters, marque: [matchingMarque] }
        setFilters(newFilters)
        setSearchApplied(true)
      }
    }
  }, [initialSearch, vehicles, searchApplied])

  // Extract unique values
  const uniqueMarques = Array.from(new Set(vehicles.map(v => v.marque))).sort()
  const uniqueCarburants = Array.from(new Set(vehicles.map(v => v.carburant).filter(Boolean))).sort()
  const uniqueBoites = Array.from(new Set(vehicles.map(v => v.boite).filter(Boolean))).sort()

  // Get modeles based on selected marques
  const availableModeles = vehicles
    .filter(v =>
      !Array.isArray(filters.marque) ||
      filters.marque.length === 0 ||
      filters.marque.includes(v.marque)
    )
    .map(v => v.modele)
  const uniqueModeles = Array.from(new Set(availableModeles)).sort()

  const handleCheckboxChange = (category: string, value: string) => {
    const currentValues = Array.isArray(filters[category]) ? filters[category] as string[] : []
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value]

    const newFilters = { ...filters, [category]: newValues }
    setFilters(newFilters)
  }

  const handleInputChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value ? Number(value) : '' }
    setFilters(newFilters)
  }

  const handleReset = () => {
    const emptyFilters = {
      marque: [],
      modele: [],
      carburant: [],
      boite: [],
      critair: [],
      prix_min: '',
      prix_max: '',
      annee_min: '',
      annee_max: '',
      km_min: '',
      km_max: '',
    }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  // Apply filters
  useEffect(() => {
    onFilterChange(filters)
  }, [filters])

  const filtersContent = (
    <div className="space-y-6">
        {/* Marque */}
        {uniqueMarques.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Marque</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {uniqueMarques.map((marque) => (
                <label key={marque} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Array.isArray(filters.marque) && filters.marque.includes(marque)}
                    onChange={() => handleCheckboxChange('marque', marque)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{marque}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    ({vehicles.filter(v => v.marque === marque).length})
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Modèle */}
        {uniqueModeles.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Modèle</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {uniqueModeles.map((modele) => (
                <label key={modele} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Array.isArray(filters.modele) && filters.modele.includes(modele)}
                    onChange={() => handleCheckboxChange('modele', modele)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{modele}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Prix */}
        <div>
          <h3 className="font-semibold mb-3">Prix</h3>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.prix_min}
              onChange={(e) => handleInputChange('prix_min', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.prix_max}
              onChange={(e) => handleInputChange('prix_max', e.target.value)}
            />
          </div>
        </div>

        {/* Kilométrage */}
        <div>
          <h3 className="font-semibold mb-3">Kilométrage</h3>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.km_min}
              onChange={(e) => handleInputChange('km_min', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.km_max}
              onChange={(e) => handleInputChange('km_max', e.target.value)}
            />
          </div>
        </div>

        {/* Année */}
        <div>
          <h3 className="font-semibold mb-3">Année</h3>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.annee_min}
              onChange={(e) => handleInputChange('annee_min', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.annee_max}
              onChange={(e) => handleInputChange('annee_max', e.target.value)}
            />
          </div>
        </div>

        {/* Carburant */}
        {uniqueCarburants.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Carburant</h3>
            <div className="space-y-2">
              {uniqueCarburants.map((carburant) => (
                <label key={carburant} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Array.isArray(filters.carburant) && filters.carburant.includes(carburant as string)}
                    onChange={() => handleCheckboxChange('carburant', carburant as string)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{carburant}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Boîte */}
        {uniqueBoites.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Boîte de vitesse</h3>
            <div className="space-y-2">
              {uniqueBoites.map((boite) => (
                <label key={boite} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Array.isArray(filters.boite) && filters.boite.includes(boite as string)}
                    onChange={() => handleCheckboxChange('boite', boite as string)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{boite}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Crit'Air */}
        <div>
          <h3 className="font-semibold mb-3">Crit'Air</h3>
          <div className="space-y-2">
            {[0, 1, 2, 3, 4, 5].map((critair) => (
              <label key={critair} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Array.isArray(filters.critair) && filters.critair.includes(critair.toString())}
                  onChange={() => handleCheckboxChange('critair', critair.toString())}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Crit'Air {critair}</span>
              </label>
            ))}
          </div>
        </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Filtrer les résultats</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 px-2 text-xs"
          >
            <X className="h-4 w-4 mr-1" />
            Réinitialiser
          </Button>
        </div>
        {filtersContent}
      </>
    )
  }

  return (
    <Card className="sticky top-20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Filtres</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="h-8 px-2 text-xs"
        >
          <X className="h-4 w-4 mr-1" />
          Réinitialiser
        </Button>
      </CardHeader>
      <CardContent>
        {filtersContent}
      </CardContent>
    </Card>
  )
}
