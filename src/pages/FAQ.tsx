
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQSearch from '@/components/faq/FAQSearch';
import FAQTabs from '@/components/faq/FAQTabs';
import FAQContact from '@/components/faq/FAQContact';
import FAQSearchResults from '@/components/faq/FAQSearchResults';
import { useFAQSearch } from '@/hooks/useFAQSearch';

const FAQ = () => {
  const { searchQuery, setSearchQuery, filteredFaqs, isSearching } = useFAQSearch();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4 text-primary">Questions fréquemment posées</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Trouvez des réponses à vos questions sur VueCoin et son écosystème
            </p>
            
            <FAQSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          
          {isSearching ? (
            <FAQSearchResults searchQuery={searchQuery} filteredFaqs={filteredFaqs} />
          ) : (
            <FAQTabs />
          )}
          
          <FAQContact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
