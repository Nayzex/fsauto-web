import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = await cookies()

  // Récupérer tous les cookies
  const allCookies = cookieStore.getAll()

  // Créer la réponse
  const response = NextResponse.json({ success: true })

  // Supprimer tous les cookies Supabase (qui commencent par 'sb-')
  allCookies.forEach(cookie => {
    if (cookie.name.startsWith('sb-')) {
      response.cookies.set({
        name: cookie.name,
        value: '',
        expires: new Date(0), // Date dans le passé pour expirer immédiatement
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      })
    }
  })

  return response
}
