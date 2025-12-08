'use server'

import { getSupabaseServer } from '@/lib/supabaseServer'
import { z } from 'zod'

// Validation schemas
const contactFormSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  tel: z.string().min(10, 'Le téléphone est requis'),
  sujet: z.string().min(1, 'Le sujet est requis'),
  message: z.string().min(10, 'Le message est requis'),
  consent: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions'),
})

const repriseFormSchema = z.object({
  marque: z.string().min(2, 'La marque est requise'),
  modele: z.string().min(2, 'Le modèle est requis'),
  annee: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  kilometrage: z.number().int().min(0),
  carburant: z.string().min(1, 'Le carburant est requis'),
  boite: z.string().min(1, 'La boîte de vitesse est requise'),
  etat: z.string().min(1, "L'état du véhicule est requis"),
  commentaire: z.string().optional(),
  nom: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  tel: z.string().min(10, 'Le téléphone est requis'),
  consent: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions'),
})

export async function submitContactForm(formData: unknown) {
  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(formData)

    const supabase = getSupabaseServer()

    // Store lead in database (no email sent)
    const { error } = await supabase.from('lead').insert({
      nom: validatedData.nom,
      email: validatedData.email,
      tel: validatedData.tel,
      message: `Sujet: ${validatedData.sujet}\n\n${validatedData.message}`,
      source: 'contact_page',
      consent_rgpd: validatedData.consent,
      created_at: new Date().toISOString(),
    })

    if (error) {
      return {
        success: false,
        message: 'Une erreur est survenue lors de la sauvegarde. Veuillez réessayer.',
      }
    }

    return {
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous recontacterons bientôt.',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      return {
        success: false,
        message: firstError?.message || 'Erreur de validation',
      }
    }
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer.',
    }
  }
}

export async function submitRepriseForm(formData: unknown) {
  try {
    // Validate form data
    const validatedData = repriseFormSchema.parse(formData)

    const supabase = getSupabaseServer()

    // Store lead in database (no email sent)
    const { error } = await supabase.from('lead').insert({
      nom: validatedData.nom,
      email: validatedData.email,
      tel: validatedData.tel,
      message: `Demande de reprise:\n\nMarque: ${validatedData.marque}\nModèle: ${validatedData.modele}\nAnnée: ${validatedData.annee}\nKilométrage: ${validatedData.kilometrage} km\nCarburant: ${validatedData.carburant}\nBoîte: ${validatedData.boite}\nÉtat: ${validatedData.etat}\n${validatedData.commentaire ? `\nCommentaires: ${validatedData.commentaire}` : ''}`,
      source: 'reprise_page',
      consent_rgpd: validatedData.consent,
      created_at: new Date().toISOString(),
    })

    if (error) {
      return {
        success: false,
        message: 'Une erreur est survenue lors de la sauvegarde. Veuillez réessayer.',
      }
    }

    return {
      success: true,
      message: 'Votre demande d\'estimation a été reçue. Nous vous enverrons une estimation sous 24h.',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0]
      return {
        success: false,
        message: firstError?.message || 'Erreur de validation',
      }
    }
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer.',
    }
  }
}
