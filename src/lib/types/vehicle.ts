export type VehicleStatut = 'draft' | 'online' | 'sold'

export interface VehicleImage {
  id: string
  vehicle_id: string
  url: string
  alt: string
  ordre: number
}

export interface Vehicle {
  id: string
  slug: string
  marque: string
  modele: string
  version?: string
  annee: number
  kilometrage: number
  prix: number
  prix_loa?: number
  carburant?: string
  boite?: string
  puissance_ch?: number
  norme_euro?: string
  critair?: number
  couleur_ext?: string
  couleur_int?: string
  carrosserie?: string
  garantie?: string
  reprise_ok: boolean
  historique_entretien?: string
  options?: string[]
  description?: string
  statut: VehicleStatut
  created_at: string
  updated_at: string
  published_at?: string
  images?: VehicleImage[]
}

export interface VehicleFilters {
  marque?: string[]
  modele?: string[]
  carburant?: string[]
  boite?: string[]
  critair?: number[]
  annee_min?: number
  annee_max?: number
  prix_min?: number
  prix_max?: number
  km_min?: number
  km_max?: number
  search?: string
}

export interface VehicleSortOption {
  label: string
  value: string
  field: keyof Vehicle
  direction: 'asc' | 'desc'
}
