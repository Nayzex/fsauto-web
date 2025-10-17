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
      <div className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Notre équipe est à votre disposition pour répondre à toutes vos questions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6 animate-slide-in-left">
          <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <CardTitle>Informations de contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 group/item">
                <div className="rounded-lg bg-primary/10 p-3 group-hover/item:bg-primary/20 transition-all group-hover/item:scale-110">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Adresse</h3>
                  <p className="text-muted-foreground">
                    9039 Bd du Champ Bossu<br />
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

          {/* Google Maps */}
          <Card className="hover:shadow-xl transition-all duration-300 animate-fade-in animate-delay-200">
            <CardContent className="p-0 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2751.8!2d4.1176!3d46.4533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4fb8c8c8c8c8c%3A0x8c8c8c8c8c8c8c8c!2s9039%20Bd%20du%20Champ%20Bossu%2C%2071600%20Paray-le-Monial!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="animate-slide-in-right hover:shadow-xl transition-all duration-300">
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

              <Button type="submit" className="w-full relative overflow-hidden group hover:shadow-lg hover:shadow-primary/50 transition-all">
                <span className="relative z-10">Envoyer le message</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
