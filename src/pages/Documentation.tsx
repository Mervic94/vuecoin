
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DocSection from '@/components/documentation/DocSection';
import { documentationSections } from '@/data/documentation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Book, Code, Users, Lightbulb } from 'lucide-react';

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const categories = Array.from(new Set(documentationSections.map(section => section.category)));
  const levels = ['beginner', 'intermediate', 'advanced'];

  const filteredSections = documentationSections.filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || section.category === selectedCategory;
    const matchesLevel = !selectedLevel || section.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Documentation VueCoin</h1>
          <p className="text-xl text-blue-100 mb-8">
            Guides complets, références API et tutoriels pour développer avec VueCoin
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Rechercher dans la documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white text-gray-900"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Quick Navigation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Accès rapide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-6 rounded-lg text-center hover:bg-blue-100 transition-colors cursor-pointer">
              <Book className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-900">Guide de démarrage</h3>
              <p className="text-sm text-blue-700 mt-2">Commencez avec VueCoin</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center hover:bg-green-100 transition-colors cursor-pointer">
              <Code className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-900">API Reference</h3>
              <p className="text-sm text-green-700 mt-2">Documentation technique</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center hover:bg-purple-100 transition-colors cursor-pointer">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-purple-900">Communauté</h3>
              <p className="text-sm text-purple-700 mt-2">Rejoignez les développeurs</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg text-center hover:bg-orange-100 transition-colors cursor-pointer">
              <Lightbulb className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-orange-900">Exemples</h3>
              <p className="text-sm text-orange-700 mt-2">Code et tutoriels</p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Filtrer par catégorie</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                Toutes
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Filtrer par niveau</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedLevel === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(null)}
              >
                Tous niveaux
              </Button>
              {levels.map(level => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                >
                  {getLevelText(level)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Documentation Sections */}
        <section>
          {filteredSections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune documentation trouvée pour vos critères de recherche.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredSections.map(section => (
                <DocSection key={section.id} section={section} />
              ))}
            </div>
          )}
        </section>

        {/* Help Section */}
        <section className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Besoin d'aide ?</h3>
          <p className="text-muted-foreground mb-6">
            Notre équipe est là pour vous accompagner dans votre développement avec VueCoin
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Discord</h4>
              <p className="text-sm text-muted-foreground mb-3">Rejoignez notre communauté</p>
              <Button variant="outline" size="sm">Rejoindre</Button>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Support</h4>
              <p className="text-sm text-muted-foreground mb-3">Contactez notre équipe</p>
              <Button variant="outline" size="sm">Contacter</Button>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">GitHub</h4>
              <p className="text-sm text-muted-foreground mb-3">Code source et issues</p>
              <Button variant="outline" size="sm">Voir le repo</Button>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Documentation;
