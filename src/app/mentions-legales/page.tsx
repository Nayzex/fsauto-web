export const metadata = {
  title: 'Mentions légales - FSauto',
  description: 'Mentions légales du site FSauto',
}

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 animate-fade-in-down">Mentions légales</h1>

      <div className="prose prose-neutral max-w-none space-y-8">
        <section className="animate-fade-in-up">
          <h2 className="text-2xl font-semibold mb-4">1. Informations légales</h2>
          <p className="text-muted-foreground mb-4">
            <strong>Raison sociale :</strong> FSauto - Garage de Bourgogne<br />
            <strong>Forme juridique :</strong> SARL<br />
            <strong>Capital social :</strong> 10 000 €<br />
            <strong>Siège social :</strong> 123 Rue de Bourgogne, 71600 Paray-le-Monial<br />
            <strong>SIRET :</strong> 123 456 789 00010<br />
            <strong>TVA intracommunautaire :</strong> FR12 123456789<br />
            <strong>Téléphone :</strong> 06 41 16 47 46<br />
            <strong>Email :</strong> contact@fsauto.fr
          </p>
          <p className="text-muted-foreground">
            <strong>Directeur de la publication :</strong> [Nom du directeur]<br />
            <strong>Responsable de la rédaction :</strong> [Nom du responsable]
          </p>
        </section>

        <section className="animate-fade-in-up animate-delay-100">
          <h2 className="text-2xl font-semibold mb-4">2. Hébergement</h2>
          <p className="text-muted-foreground">
            <strong>Hébergeur :</strong> Vercel Inc.<br />
            <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
            <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">vercel.com</a>
          </p>
        </section>

        <section className="animate-fade-in-up animate-delay-200">
          <h2 className="text-2xl font-semibold mb-4">3. Propriété intellectuelle</h2>
          <p className="text-muted-foreground mb-4">
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
          <p className="text-muted-foreground">
            La reproduction de tout ou partie de ce site sur un support électronique ou autre quel qu'il soit est formellement interdite
            sauf autorisation expresse du directeur de la publication.
          </p>
        </section>

        <section className="animate-fade-in-up animate-delay-300">
          <h2 className="text-2xl font-semibold mb-4">4. Crédits</h2>
          <p className="text-muted-foreground">
            <strong>Conception et développement :</strong> FSauto<br />
            <strong>Crédits photos :</strong> Unsplash, images libres de droits
          </p>
        </section>

        <section className="animate-fade-in-up animate-delay-400">
          <h2 className="text-2xl font-semibold mb-4">5. Liens hypertextes</h2>
          <p className="text-muted-foreground">
            Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources
            présentes sur le réseau Internet ne sauraient engager la responsabilité de FSauto.
          </p>
        </section>

        <section className="animate-fade-in-up animate-delay-500">
          <h2 className="text-2xl font-semibold mb-4">6. Limitation de responsabilité</h2>
          <p className="text-muted-foreground">
            FSauto ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur,
            lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications,
            soit de l'apparition d'un bug ou d'une incompatibilité.
          </p>
        </section>
      </div>
    </div>
  )
}
