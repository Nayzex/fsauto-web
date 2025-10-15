export const metadata = {
  title: 'Politique de confidentialité (RGPD) - FSauto',
  description: 'Politique de confidentialité et protection des données personnelles - FSauto',
}

export default function RGPDPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Politique de confidentialité (RGPD)</h1>

      <div className="prose prose-neutral max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-muted-foreground">
            FSauto s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité explique
            comment nous collectons, utilisons et protégeons vos données personnelles conformément au Règlement Général
            sur la Protection des Données (RGPD).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Responsable du traitement</h2>
          <p className="text-muted-foreground">
            <strong>Responsable du traitement :</strong> FSauto - Garage de Bourgogne<br />
            <strong>Adresse :</strong> 123 Rue de Bourgogne, 71600 Paray-le-Monial<br />
            <strong>Email :</strong> contact@fsauto.fr<br />
            <strong>Téléphone :</strong> 06 41 16 47 46
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Données collectées</h2>
          <p className="text-muted-foreground mb-4">
            Nous collectons les données personnelles suivantes :
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Informations relatives à votre véhicule (pour les demandes de reprise)</li>
            <li>Messages et demandes de contact</li>
            <li>Données de navigation (cookies)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Finalités du traitement</h2>
          <p className="text-muted-foreground mb-4">
            Vos données personnelles sont utilisées pour :
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Répondre à vos demandes d'information</li>
            <li>Traiter vos demandes de reprise de véhicule</li>
            <li>Vous proposer des offres de véhicules correspondant à vos critères</li>
            <li>Gérer votre relation client</li>
            <li>Améliorer notre site web et nos services</li>
            <li>Vous envoyer des informations commerciales (avec votre consentement)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Base légale du traitement</h2>
          <p className="text-muted-foreground">
            Le traitement de vos données personnelles repose sur :
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Votre consentement (formulaires de contact, newsletter)</li>
            <li>L'exécution d'un contrat (achat ou vente de véhicule)</li>
            <li>Notre intérêt légitime (amélioration de nos services, sécurité)</li>
            <li>Le respect d'obligations légales</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Durée de conservation</h2>
          <p className="text-muted-foreground">
            Vos données personnelles sont conservées pendant une durée n'excédant pas celle nécessaire aux finalités
            pour lesquelles elles sont traitées :
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Demandes de contact : 24 mois après le dernier contact</li>
            <li>Clients : durée de la relation commerciale + 5 ans (obligations légales)</li>
            <li>Données de navigation : 13 mois</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Vos droits</h2>
          <p className="text-muted-foreground mb-4">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
            <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
            <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
            <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
            <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
            <li><strong>Droit de retirer votre consentement :</strong> à tout moment</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@fsauto.fr" className="text-primary hover:underline">contact@fsauto.fr</a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Sécurité des données</h2>
          <p className="text-muted-foreground">
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
            personnelles contre la destruction, la perte, l'altération, la divulgation ou l'accès non autorisés.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Cookies</h2>
          <p className="text-muted-foreground mb-4">
            Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez gérer vos
            préférences de cookies à tout moment via les paramètres de votre navigateur.
          </p>
          <p className="text-muted-foreground">
            Les cookies utilisés : cookies techniques (nécessaires au fonctionnement du site) et cookies analytiques
            (mesure d'audience avec votre consentement).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Réclamation</h2>
          <p className="text-muted-foreground">
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL :
          </p>
          <p className="text-muted-foreground">
            <strong>CNIL</strong><br />
            3 Place de Fontenoy - TSA 80715<br />
            75334 PARIS CEDEX 07<br />
            Téléphone : 01 53 73 22 22<br />
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnil.fr</a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Modifications</h2>
          <p className="text-muted-foreground">
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. La version
            actuelle est disponible sur cette page avec la date de dernière mise à jour.
          </p>
          <p className="text-muted-foreground mt-4">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>
        </section>
      </div>
    </div>
  )
}
