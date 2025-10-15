import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, FileText, Calculator, Car } from 'lucide-react'

export const metadata = {
  title: 'Reprise de véhicule - FSauto',
  description: 'Faites reprendre votre ancien véhicule au meilleur prix - FSauto à Paray-le-Monial',
}

export default function ReprisePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Reprise de votre véhicule</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Obtenez une estimation gratuite et échangez votre ancien véhicule contre un nouveau
        </p>
      </div>

      {/* How it works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">1. Remplissez le formulaire</h3>
            <p className="text-sm text-muted-foreground">
              Décrivez votre véhicule en quelques clics
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">2. Estimation immédiate</h3>
            <p className="text-sm text-muted-foreground">
              Recevez une première estimation sous 24h
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">3. Expertise du véhicule</h3>
            <p className="text-sm text-muted-foreground">
              Rendez-vous en concession pour l'expertise
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">4. Validation finale</h3>
            <p className="text-sm text-muted-foreground">
              Confirmez l'offre et choisissez votre nouveau véhicule
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Demande d'estimation de reprise</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="marque" className="block text-sm font-medium mb-2">
                    Marque *
                  </label>
                  <input
                    type="text"
                    id="marque"
                    required
                    className="w-full rounded-lg border border-border px-3 py-2"
                    placeholder="Ex: Renault"
                  />
                </div>

                <div>
                  <label htmlFor="modele" className="block text-sm font-medium mb-2">
                    Modèle *
                  </label>
                  <input
                    type="text"
                    id="modele"
                    required
                    className="w-full rounded-lg border border-border px-3 py-2"
                    placeholder="Ex: Clio"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="annee" className="block text-sm font-medium mb-2">
                    Année *
                  </label>
                  <input
                    type="number"
                    id="annee"
                    required
                    className="w-full rounded-lg border border-border px-3 py-2"
                    placeholder="Ex: 2020"
                  />
                </div>

                <div>
                  <label htmlFor="kilometrage" className="block text-sm font-medium mb-2">
                    Kilométrage *
                  </label>
                  <input
                    type="number"
                    id="kilometrage"
                    required
                    className="w-full rounded-lg border border-border px-3 py-2"
                    placeholder="Ex: 50000"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="carburant" className="block text-sm font-medium mb-2">
                    Carburant *
                  </label>
                  <select
                    id="carburant"
                    required
                    className="w-full rounded-lg border border-border px-3 py-2"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="Essence">Essence</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybride">Hybride</option>
                    <option value="Électrique">Électrique</option>
                    <option value="GPL">GPL</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="boite" className="block text-sm font-medium mb-2">
                    Boîte de vitesse *
                  </label>
                  <select
                    id="boite"
                    required
                    className="w-full rounded-lg border border-border px-3 py-2"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="Manuelle">Manuelle</option>
                    <option value="Automatique">Automatique</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="etat" className="block text-sm font-medium mb-2">
                  État général du véhicule *
                </label>
                <select
                  id="etat"
                  required
                  className="w-full rounded-lg border border-border px-3 py-2"
                >
                  <option value="">Sélectionnez</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Très bon">Très bon</option>
                  <option value="Bon">Bon</option>
                  <option value="Moyen">Moyen</option>
                </select>
              </div>

              <div>
                <label htmlFor="commentaire" className="block text-sm font-medium mb-2">
                  Informations complémentaires
                </label>
                <textarea
                  id="commentaire"
                  rows={4}
                  className="w-full rounded-lg border border-border px-3 py-2"
                  placeholder="Options, état particulier, historique d'entretien..."
                />
              </div>

              <hr />

              <div className="grid md:grid-cols-2 gap-4">
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

              <Button type="submit" className="w-full" size="lg">
                Obtenir mon estimation gratuite
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
