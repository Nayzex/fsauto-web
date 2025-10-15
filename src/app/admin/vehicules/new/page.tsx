'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'

const schema = z.object({
  marque: z.string().min(1),
  modele: z.string().min(1),
  version: z.string().optional(),
  annee: z.coerce.number().int().min(1980).max(new Date().getFullYear() + 1),
  kilometrage: z.coerce.number().int().min(0),
  prix: z.coerce.number().min(0),
  prix_loa: z.coerce.number().optional(),
  carburant: z.string().optional(),
  boite: z.string().optional(),
  puissance_ch: z.coerce.number().int().optional(),
  norme_euro: z.string().optional(),
  critair: z.coerce.number().int().min(0).max(5).optional(),
  garantie: z.string().optional(),
  reprise_ok: z.coerce.boolean().optional(),
  historique_entretien: z.string().optional(),
  options: z.string().optional(), // CSV => array
  description: z.string().optional(),
  statut: z.enum(['draft','online','sold']).default('draft'),
})

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function NewVehiclePage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)

  async function onSubmit(form: FormData) {
    setSubmitting(true)
    try {
      const parsed = schema.parse({
        marque: form.get('marque'),
        modele: form.get('modele'),
        version: form.get('version') || undefined,
        annee: form.get('annee'),
        kilometrage: form.get('kilometrage'),
        prix: form.get('prix'),
        prix_loa: form.get('prix_loa') || undefined,
        carburant: form.get('carburant') || undefined,
        boite: form.get('boite') || undefined,
        puissance_ch: form.get('puissance_ch') || undefined,
        norme_euro: form.get('norme_euro') || undefined,
        critair: form.get('critair') || undefined,
        garantie: form.get('garantie') || undefined,
        reprise_ok: form.get('reprise_ok') === 'on',
        historique_entretien: form.get('historique_entretien') || undefined,
        options: form.get('options') || undefined,
        description: form.get('description') || undefined,
        statut: (form.get('statut') as 'draft'|'online'|'sold') ?? 'draft',
      })

      // images
      const fl = files
      if (!fl || fl.length < 3) {
        toast.error('Ajoute au moins 3 photos (max 50).')
        setSubmitting(false)
        return
      }
      if (fl.length > 50) {
        toast.error('Maximum 50 photos.')
        setSubmitting(false)
        return
      }

      const slugBase = `${parsed.marque}-${parsed.modele}-${parsed.version ?? ''}-${parsed.annee}`.replace(/--+/g,'-')
      const slug = `${slugify(slugBase)}-${Math.random().toString(36).slice(2,6)}`
      const now = new Date().toISOString()

      // Insert vehicle
      const { data: vehicle, error: insertErr } = await supabase
        .from('vehicle')
        .insert({
          slug,
          marque: parsed.marque,
          modele: parsed.modele,
          version: parsed.version,
          annee: parsed.annee,
          kilometrage: parsed.kilometrage,
          prix: parsed.prix,
          prix_loa: parsed.prix_loa,
          carburant: parsed.carburant,
          boite: parsed.boite,
          puissance_ch: parsed.puissance_ch,
          norme_euro: parsed.norme_euro,
          critair: parsed.critair,
          garantie: parsed.garantie,
          reprise_ok: parsed.reprise_ok ?? false,
          historique_entretien: parsed.historique_entretien,
          options: parsed.options ? parsed.options.split(',').map(s => s.trim()).filter(Boolean) : null,
          description: parsed.description,
          statut: parsed.statut,
          published_at: parsed.statut === 'online' ? now : null,
        })
        .select('id, slug')
        .single()

      if (insertErr || !vehicle) throw insertErr

      // Upload photos
      const uploads: { path: string; url: string }[] = []
      for (let i = 0; i < fl.length; i++) {
        const f = fl[i]
        const key = `vehicles/${vehicle.id}/${Date.now()}-${i}-${f.name.replace(/\s+/g,'_')}`
        const { error: upErr } = await supabase.storage.from('vehicles').upload(key, f, {
          cacheControl: '3600',
          upsert: false,
        })
        if (upErr) throw upErr
        const { data: pub } = supabase.storage.from('vehicles').getPublicUrl(key)
        uploads.push({ path: key, url: pub.publicUrl })
      }

      // Insert vehicle_image rows
      const { error: imgErr } = await supabase.from('vehicle_image').insert(
        uploads.map((u, idx) => ({
          vehicle_id: vehicle.id,
          url: u.url,
          alt: `${parsed.marque} ${parsed.modele} ${parsed.annee} - photo ${idx+1}`,
          ordre: idx,
        }))
      )
      if (imgErr) throw imgErr

      toast.success('Annonce créée')
      router.replace(`/voitures/${vehicle.slug}`)
    } catch (e: unknown) {
      console.error(e)
      const error = e as Error
      toast.error(error?.message ?? 'Erreur')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Nouvelle annonce</h1>
      <form action={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input name="marque" placeholder="Marque *" required className="rounded border p-2"/>
        <input name="modele" placeholder="Modèle *" required className="rounded border p-2"/>
        <input name="version" placeholder="Version" className="rounded border p-2"/>
        <input name="annee" type="number" placeholder="Année *" required className="rounded border p-2"/>
        <input name="kilometrage" type="number" placeholder="Kilométrage *" required className="rounded border p-2"/>
        <input name="prix" type="number" step="0.01" placeholder="Prix € *" required className="rounded border p-2"/>
        <input name="prix_loa" type="number" step="0.01" placeholder="Prix LOA €" className="rounded border p-2"/>
        <input name="carburant" placeholder="Carburant" className="rounded border p-2"/>
        <input name="boite" placeholder="Boîte" className="rounded border p-2"/>
        <input name="puissance_ch" type="number" placeholder="Puissance (ch)" className="rounded border p-2"/>
        <input name="norme_euro" placeholder="Norme Euro" className="rounded border p-2"/>
        <input name="critair" type="number" placeholder="Crit'Air (0-5)" className="rounded border p-2"/>
        <input name="garantie" placeholder="Garantie" className="rounded border p-2"/>
        <label className="flex items-center gap-2 md:col-span-2">
          <input type="checkbox" name="reprise_ok" /> Reprise possible
        </label>
        <textarea name="historique_entretien" placeholder="Historique d’entretien" className="rounded border p-2 md:col-span-2"/>
        <textarea name="options" placeholder="Options (séparées par des virgules)" className="rounded border p-2 md:col-span-2"/>
        <textarea name="description" placeholder="Description" className="rounded border p-2 md:col-span-2"/>
        <div className="md:col-span-2">
          <label className="mb-1 block font-medium">Photos (3–50) *</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="w-full rounded border p-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block font-medium">Statut</label>
          <select name="statut" defaultValue="draft" className="rounded border p-2">
            <option value="draft">Brouillon</option>
            <option value="online">En ligne</option>
            <option value="sold">Vendu</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <button
            disabled={submitting}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500 disabled:opacity-60"
          >
            {submitting ? 'Envoi…' : 'Créer l’annonce'}
          </button>
        </div>
      </form>
    </main>
  )
}