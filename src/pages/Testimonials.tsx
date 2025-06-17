
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import TestimonialDetail from '@/components/testimonials/TestimonialDetail';
import TestimonialStats from '@/components/testimonials/TestimonialStats';
import { testimonials } from '@/data/testimonials';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sectors = ['advertising', 'real-estate', 'transport', 'ecommerce'];

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.contactPerson.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !selectedSector || testimonial.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const selectedTestimonialData = selectedTestimonial ? 
    testimonials.find(t => t.id === selectedTestimonial) : null;

  const getSectorLabel = (sector: string) => {
    switch (sector) {
      case 'advertising': return 'Publicité';
      case 'real-estate': return 'Immobilier-BTP';
      case 'transport': return 'Transport';
      case 'ecommerce': return 'E-commerce';
      default: return sector;
    }
  };

  if (selectedTestimonialData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-1">
          <TestimonialDetail 
            testimonial={selectedTestimonialData} 
            onBack={() => setSelectedTestimonial(null)} 
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Témoignages et Cas d'Utilisation</h1>
          <p className="text-xl text-blue-100 mb-8">
            Découvrez comment nos partenaires transforment leurs activités avec VueCoin
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Rechercher un partenaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white text-gray-900"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Statistics */}
        <TestimonialStats />

        {/* Sector Filters */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filtrer par secteur</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSector === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSector(null)}
            >
              Tous les secteurs
            </Button>
            {sectors.map(sector => (
              <Button
                key={sector}
                variant={selectedSector === sector ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSector(sector)}
              >
                {getSectorLabel(sector)}
              </Button>
            ))}
          </div>
        </div>

        {/* Success Stories Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {searchTerm || selectedSector ? 'Résultats' : 'Nos success stories'}
          </h2>
          
          {filteredTestimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun témoignage trouvé pour votre recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTestimonials.map(testimonial => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  onClick={() => setSelectedTestimonial(testimonial.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Rejoignez nos partenaires</h3>
          <p className="text-muted-foreground mb-6">
            Vous aussi, transformez votre activité avec VueCoin et bénéficiez d'un écosystème innovant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Devenir partenaire</Button>
            <Button variant="outline" size="lg">Demander une démo</Button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Testimonials;
