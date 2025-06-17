
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/blog/BlogCard';
import BlogPost from '@/components/blog/BlogPost';
import { blogPosts } from '@/data/blogPosts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedPostData = selectedPost ? blogPosts.find(post => post.id === selectedPost) : null;

  if (selectedPostData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-1">
          <BlogPost 
            post={selectedPostData} 
            onBack={() => setSelectedPost(null)} 
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
          <h1 className="text-4xl font-bold mb-4">Blog VueCoin</h1>
          <p className="text-xl text-blue-100 mb-8">
            Découvrez les dernières actualités, guides techniques et témoignages de notre écosystème
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white text-gray-900"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Category Filters */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Catégories</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Tous
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

        {/* Featured Article */}
        {filteredPosts.length > 0 && !searchTerm && !selectedCategory && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Article à la une</h2>
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-lg p-8 text-white">
              <div className="max-w-3xl">
                <Badge variant="secondary" className="mb-4">{filteredPosts[0].category}</Badge>
                <h3 className="text-3xl font-bold mb-4">{filteredPosts[0].title}</h3>
                <p className="text-blue-100 mb-6 text-lg">{filteredPosts[0].excerpt}</p>
                <Button 
                  variant="secondary"
                  onClick={() => setSelectedPost(filteredPosts[0].id)}
                >
                  Lire l'article
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {searchTerm || selectedCategory ? 'Résultats' : 'Derniers articles'}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun article trouvé pour votre recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onClick={() => setSelectedPost(post.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Newsletter Subscription */}
        <section className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Restez informé</h3>
          <p className="text-muted-foreground mb-6">
            Recevez les dernières actualités VueCoin directement dans votre boîte mail
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input type="email" placeholder="Votre adresse email" />
            <Button>S'abonner</Button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
