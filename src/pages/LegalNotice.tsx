
import React from 'react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LegalNotice = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-primary">Mentions légales</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Dernière mise à jour : 3 Mai 2025
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
              <p>
                <strong>VueCoin SAS</strong><br />
                Société par actions simplifiée au capital de 100 000 €<br />
                RCS Paris B 123 456 789<br />
                Siège social : 75 Avenue des Champs-Élysées, 75008 Paris, France<br />
                N° TVA intracommunautaire : FR 12 123456789<br />
                Téléphone : +33 (0)1 23 45 67 89<br />
                Email : <a href="mailto:contact@vuecoin.fr" className="text-primary hover:underline">contact@vuecoin.fr</a>
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Directeur de la publication</h2>
              <p>
                Monsieur Jean Dupont, Président de VueCoin SAS
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Hébergeur</h2>
              <p>
                <strong>OVH SAS</strong><br />
                2 rue Kellermann<br />
                59100 Roubaix, France<br />
                Téléphone : +33 (0)8 99 70 17 61
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Autorités de surveillance</h2>
              <p>
                VueCoin SAS est inscrite au registre des prestataires de services sur actifs numériques (PSAN) 
                tenu par l'Autorité des marchés financiers (AMF) sous le numéro E123456.
              </p>
              <p className="mt-4">
                <strong>Autorité des marchés financiers (AMF)</strong><br />
                17, place de la Bourse<br />
                75082 Paris Cedex 02<br />
                <a href="https://www.amf-france.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.amf-france.org</a>
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="mt-4">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite 
                sauf autorisation expresse du directeur de la publication.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Liens hypertextes</h2>
              <p>
                Le site VueCoin peut contenir des liens hypertextes vers d'autres sites. VueCoin n'exerce aucun contrôle sur ces sites 
                et n'assume aucune responsabilité quant à leur contenu.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Données personnelles</h2>
              <p>
                Les informations relatives au traitement des données personnelles sont détaillées dans notre 
                <a href="/privacy-policy" className="text-primary hover:underline"> Politique de confidentialité</a>.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Droit applicable et juridiction compétente</h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront compétents.
              </p>
            </section>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button onClick={() => window.history.back()} variant="outline" size="lg">
              Retour
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalNotice;
