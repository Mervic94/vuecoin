
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, LogOut, User, History, HelpCircle } from "lucide-react";
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
                    asChild
                  >
                    <Link to="/transactions">
                      <History className="mr-2 h-4 w-4" />
                      Historique
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary"
                    asChild
                  >
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profil
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary"
                    asChild
                  >
                    <Link to="/help">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Aide
                    </Link>
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
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to="/transactions">
                        <History className="mr-2 h-4 w-4" />
                        Historique
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-primary"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profil
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-primary"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to="/help">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Aide
                      </Link>
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
