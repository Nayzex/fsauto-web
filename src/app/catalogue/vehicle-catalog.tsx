'use client'

import { useState, useEffect } from 'react'
import { VehicleCard } from '@/components/vehicles/vehicle-card'
import { VehicleFilters } from '@/components/vehicles/vehicle-filters'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import type { Vehicle } from '@/lib/types/vehicle'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 12

export function VehicleCatalog() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('date_desc')

  // Fetch vehicles
  useEffect(() => {
    async function fetchVehicles() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('vehicle')
          .select('*, images:vehicle_image(*)')
          .eq('statut', 'online')
          .order('published_at', { ascending: false })

        if (error) throw error

        const vehiclesData = (data || []) as Vehicle[]
        setVehicles(vehiclesData)
        setFilteredVehicles(vehiclesData)
      } catch (error) {
        console.error('Error fetching vehicles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  // Sort vehicles
  useEffect(() => {
    const sorted = [...filteredVehicles]

    switch (sortBy) {
      case 'prix_asc':
        sorted.sort((a, b) => a.prix - b.prix)
        break
      case 'prix_desc':
        sorted.sort((a, b) => b.prix - a.prix)
        break
      case 'km_asc':
        sorted.sort((a, b) => a.kilometrage - b.kilometrage)
        break
      case 'annee_desc':
        sorted.sort((a, b) => b.annee - a.annee)
        break
      case 'date_desc':
      default:
        sorted.sort((a, b) =>
          new Date(b.published_at || b.created_at).getTime() -
          new Date(a.published_at || a.created_at).getTime()
        )
    }

    setFilteredVehicles(sorted)
  }, [sortBy])

  // Handle filters
  const handleFilterChange = (filters: Record<string, string[] | number | string | undefined>) => {
    let filtered = [...vehicles]

    // Filter by marque
    if (Array.isArray(filters.marque) && filters.marque.length > 0) {
      filtered = filtered.filter(v => (filters.marque as string[]).includes(v.marque))
    }

    // Filter by prix
    if (typeof filters.prix_min === 'number') {
      filtered = filtered.filter(v => v.prix >= (filters.prix_min as number))
    }
    if (typeof filters.prix_max === 'number') {
      filtered = filtered.filter(v => v.prix <= (filters.prix_max as number))
    }

    // Filter by année
    if (typeof filters.annee_min === 'number') {
      filtered = filtered.filter(v => v.annee >= (filters.annee_min as number))
    }
    if (typeof filters.annee_max === 'number') {
      filtered = filtered.filter(v => v.annee <= (filters.annee_max as number))
    }

    // Filter by carburant
    if (Array.isArray(filters.carburant) && filters.carburant.length > 0) {
      filtered = filtered.filter(v => v.carburant && (filters.carburant as string[]).includes(v.carburant))
    }

    // Filter by boite
    if (Array.isArray(filters.boite) && filters.boite.length > 0) {
      filtered = filtered.filter(v => v.boite && (filters.boite as string[]).includes(v.boite))
    }

    // Filter by critair
    if (Array.isArray(filters.critair) && filters.critair.length > 0) {
      filtered = filtered.filter(v => v.critair !== undefined && (filters.critair as unknown as number[]).includes(v.critair))
    }

    setFilteredVehicles(filtered)
    setCurrentPage(1)
  }

  // Pagination
  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentVehicles = filteredVehicles.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p>Chargement des véhicules...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters sidebar */}
      <aside className="lg:w-64 flex-shrink-0">
        <VehicleFilters
          vehicles={vehicles}
          onFilterChange={handleFilterChange}
        />
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Sort and results count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <p className="text-muted-foreground">
            {filteredVehicles.length} résultat{filteredVehicles.length > 1 ? 's' : ''}
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium">
              Trier par:
            </label>
            <Select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-48"
            >
              <option value="date_desc">Plus récents</option>
              <option value="prix_asc">Prix croissant</option>
              <option value="prix_desc">Prix décroissant</option>
              <option value="km_asc">Kilométrage croissant</option>
              <option value="annee_desc">Année décroissante</option>
            </Select>
          </div>
        </div>

        {/* Vehicles grid */}
        {currentVehicles.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              Aucun véhicule ne correspond à vos critères
            </p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      onClick={() => setCurrentPage(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
