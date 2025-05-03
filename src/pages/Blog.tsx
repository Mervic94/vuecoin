
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, Search, User } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const blogPosts = [
  {
    id: 1,
    title: "Comment VueCoin révolutionne l'investissement dans l'immobilier",
    excerpt: "Découvrez comment notre approche unique permet d'investir dans l'immobilier via la blockchain, ouvrant l'accès à un marché traditionnellement réservé aux plus fortunés.",
    author: "Sophie Martin",
    date: "2 mai 2025",
    category: "immobilier",
    readTime: "5 min de lecture"
  },
  {
    id: 2,
    title: "Les énergies renouvelables : un pilier d'investissement d'avenir",
    excerpt: "Analyse détaillée de notre stratégie d'investissement dans le secteur des énergies renouvelables et son impact sur la stabilité de VueCoin.",
    author: "Thomas Dubois",
    date: "28 avril 2025",
    category: "energie",
    readTime: "8 min de lecture"
  },
  {
    id: 3,
    title: "Agriculture et blockchain : une alliance prometteuse",
    excerpt: "Comment VueCoin utilise la technologie blockchain pour transformer et moderniser le secteur agricole tout en offrant des opportunités d'investissement stables.",
    author: "Marie Leroy",
    date: "20 avril 2025",
    category: "agriculture",
    readTime: "6 min de lecture"
  },
  {
    id: 4,
    title: "L'avenir des technologies de santé et leur potentiel économique",
    excerpt: "Exploration des innovations dans le domaine de la santé et comment les investissements de VueCoin dans ce secteur contribuent à créer de la valeur à long terme.",
    author: "Alexandre Petit",
    date: "15 avril 2025",
    category: "sante",
    readTime: "7 min de lecture"
  },
  {
    id: 5,
    title: "Comprendre la tokenomics de VueCoin",
    excerpt: "Guide complet sur le modèle économique de VueCoin, sa distribution, son utilité et sa stratégie de création de valeur à long terme.",
    author: "Julie Moreau",
    date: "10 avril 2025",
    category: "tokenomics",
    readTime: "10 min de lecture"
  },
  {
    id: 6,
    title: "Les avantages du staking pour les investisseurs VueCoin",
    excerpt: "Tout ce que vous devez savoir sur le staking de VueCoin, ses avantages, son fonctionnement et comment maximiser vos rendements.",
    author: "Nicolas Bernard",
    date: "5 avril 2025",
    category: "tokenomics",
    readTime: "4 min de lecture"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-primary">Blog VueCoin</h1>
              <p className="text-xl text-muted-foreground">
                Actualités, analyses et guides sur VueCoin et l'écosystème crypto
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Rechercher un article..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-10">
            <div className="overflow-x-auto">
              <TabsList className="mb-8 w-auto inline-flex">
                <TabsTrigger value="all">Tous les articles</TabsTrigger>
                <TabsTrigger value="immobilier">Immobilier</TabsTrigger>
                <TabsTrigger value="energie">Énergies</TabsTrigger>
                <TabsTrigger value="agriculture">Agriculture</TabsTrigger>
                <TabsTrigger value="sante">Santé</TabsTrigger>
                <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                    <div className="h-48 bg-muted"></div>
                    <CardContent className="pt-6 flex-1 flex flex-col">
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <span className="flex items-center mr-4">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {post.category === 'immobilier' ? 'Immobilier' :
                           post.category === 'energie' ? 'Énergies' :
                           post.category === 'agriculture' ? 'Agriculture' :
                           post.category === 'sante' ? 'Santé' : 'Tokenomics'}
                        </span>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      
                      <Button className="mt-4 w-full" variant="outline">
                        Lire l'article
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {['immobilier', 'energie', 'agriculture', 'sante', 'tokenomics'].map(category => (
              <TabsContent key={category} value={category} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts.filter(post => post.category === category).map(post => (
                    <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                      <div className="h-48 bg-muted"></div>
                      <CardContent className="pt-6 flex-1 flex flex-col">
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <span className="flex items-center mr-4">
                            <User className="h-3 w-3 mr-1" />
                            {post.author}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.date}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {post.category === 'immobilier' ? 'Immobilier' :
                             post.category === 'energie' ? 'Énergies' :
                             post.category === 'agriculture' ? 'Agriculture' :
                             post.category === 'sante' ? 'Santé' : 'Tokenomics'}
                          </span>
                          <span className="text-xs text-muted-foreground">{post.readTime}</span>
                        </div>
                        
                        <Button className="mt-4 w-full" variant="outline">
                          Lire l'article
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="flex justify-center mt-12">
            <Button className="px-8">
              Charger plus d'articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-6 text-center">Abonnez-vous à notre newsletter</h2>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="Votre adresse email" 
                className="flex-1"
              />
              <Button>S'abonner</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
