import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Logo className="text-white" />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white hover:bg-white/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </Button>

          <ul className="hidden md:flex space-x-6 items-center">
            <li><a href="#about" className="hover:text-accent transition-colors">À Propos</a></li>
            <li><a href="#sectors" className="hover:text-accent transition-colors">Secteurs</a></li>
            <li><a href="#features" className="hover:text-accent transition-colors">Caractéristiques</a></li>
            <li><a href="#roadmap" className="hover:text-accent transition-colors">Feuille de Route</a></li>
            <li><a href="#whitepaper" className="hover:text-accent transition-colors">Livre Blanc</a></li>
            <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            {user ? (
              <>
                <li>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-primary"
                    asChild
                  >
                    <Link to="/exchange">Plateforme d'échange</Link>
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <Link to="/auth">Connexion</Link>
                </Button>
              </li>
            )}
          </ul>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <ul className="flex flex-col space-y-4">
              <li><a href="#about" className="block py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>À Propos</a></li>
              <li><a href="#sectors" className="block py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>Secteurs</a></li>
              <li><a href="#features" className="block py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>Caractéristiques</a></li>
              <li><a href="#roadmap" className="block py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>Feuille de Route</a></li>
              <li><a href="#whitepaper" className="block py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>Livre Blanc</a></li>
              <li><a href="#contact" className="block py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
              {user ? (
                <>
                  <li>
                    <Button 
                      variant="outline" 
                      className="w-full border-white text-white hover:bg-white hover:text-primary"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to="/exchange">Plateforme d'échange</Link>
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-primary"
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </Button>
                  </li>
                </>
              ) : (
                <li>
                  <Button 
                    variant="outline" 
                    className="w-full border-white text-white hover:bg-white hover:text-primary"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/auth">Connexion</Link>
                  </Button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
