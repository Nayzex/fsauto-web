import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact - FSauto',
  description: 'Contactez FSauto à Paray-le-Monial - Horaires, téléphone, email',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Notre équipe est à votre disposition pour répondre à toutes vos questions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Adresse</h3>
                  <p className="text-muted-foreground">
                    123 Rue de Bourgogne<br />
                    71600 Paray-le-Monial
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Téléphone</h3>
                  <a href="tel:0641164746" className="text-primary hover:underline">
                    06 41 16 47 46
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:contact@fsauto.fr" className="text-primary hover:underline">
                    contact@fsauto.fr
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Horaires d'ouverture</h3>
                  <div className="text-muted-foreground space-y-1">
                    <p>Lundi - Vendredi: 9h00 - 12h00, 14h00 - 18h00</p>
                    <p>Samedi: 9h00 - 12h00</p>
                    <p>Dimanche: Fermé</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map placeholder */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Carte Google Maps</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Envoyez-nous un message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  id="nom"
                  required
                  className="w-full rounded-lg border border-border px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full rounded-lg border border-border px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="tel" className="block text-sm font-medium mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="tel"
                  required
                  className="w-full rounded-lg border border-border px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="sujet" className="block text-sm font-medium mb-2">
                  Sujet *
                </label>
                <select
                  id="sujet"
                  required
                  className="w-full rounded-lg border border-border px-3 py-2"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="achat">Achat d'un véhicule</option>
                  <option value="reprise">Reprise de véhicule</option>
                  <option value="financement">Financement</option>
                  <option value="entretien">Entretien / Réparation</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="w-full rounded-lg border border-border px-3 py-2"
                  placeholder="Votre message..."
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                  J'accepte que mes données soient utilisées pour me recontacter concernant ma demande *
                </label>
              </div>

              <Button type="submit" className="w-full">
                Envoyer le message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
