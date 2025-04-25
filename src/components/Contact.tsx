
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Contactez-Nous</h2>
          <p className="text-muted-foreground text-lg">
            Vous avez des questions ou souhaitez rejoindre l'aventure VueCoin?
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-none shadow-lg">
          <CardContent className="p-8 text-center">
            <p className="text-lg mb-2">Pour toute demande d'information ou proposition de partenariat:</p>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-8">
              <Mail className="h-6 w-6" />
              <span>contact@vuecoin.io</span>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Rejoignez Notre Communauté</h3>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-2xl text-secondary hover:text-accent transition-colors">📱</a>
                <a href="#" className="text-2xl text-secondary hover:text-accent transition-colors">🐦</a>
                <a href="#" className="text-2xl text-secondary hover:text-accent transition-colors">📺</a>
                <a href="#" className="text-2xl text-secondary hover:text-accent transition-colors">📘</a>
              </div>
            </div>
            
            <Button className="primary-btn bg-accent text-primary hover:bg-accent/80">
              S'inscrire à la Newsletter
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
