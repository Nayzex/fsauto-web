import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-black dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="FSauto"
                width={50}
                height={33}
                className="h-8 w-auto"
                style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
              />
              <span className="text-lg font-bold">FSauto</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Le premier de vocation automobile pour le Garage de Bourgogne à Paray-le-Monial.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/catalogue" className="hover:text-white transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/financement" className="hover:text-white transition-colors">
                  Financement
                </Link>
              </li>
              <li>
                <Link href="/reprise" className="hover:text-white transition-colors">
                  Reprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/services#entretien" className="hover:text-white transition-colors">
                  Entretien et réparation
                </Link>
              </li>
              <li>
                <Link href="/services#reprise" className="hover:text-white transition-colors">
                  Reprise
                </Link>
              </li>
              <li>
                <Link href="/services#garantie" className="hover:text-white transition-colors">
                  Garantie
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>9039 Bd du Champ Bossu<br />71600 Paray-le-Monial</span>
              </li>
              <li>
                <a href="tel:0641164746" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>06 41 16 47 46</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@fsauto.fr" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>contact@fsauto.fr</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} FSauto. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link href="/mentions-legales" className="hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/rgpd" className="hover:text-white transition-colors">
                RGPD
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
