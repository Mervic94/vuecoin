
import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
}

const TeamMember = ({ name, role, imageUrl }: TeamMemberProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
        <img 
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold text-primary mb-1">{name}</h3>
      <p className="text-muted-foreground mb-3">{role}</p>
      <div className="flex space-x-3">
        <a href="#" className="text-secondary hover:text-accent">🔗</a>
        <a href="#" className="text-secondary hover:text-accent">🔗</a>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <section id="team" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Notre Équipe</h2>
          <p className="text-muted-foreground text-lg">
            Des experts des quatre secteurs clés et des spécialistes blockchain qui unissent leurs compétences.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <TeamMember 
            name="Alexandre Martin" 
            role="CEO & Fondateur" 
            imageUrl="https://images.unsplash.com/photo-1560250097-0b93528c311a" 
          />
          <TeamMember 
            name="Marie Dubois" 
            role="CTO & Experte Blockchain" 
            imageUrl="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e" 
          />
          <TeamMember 
            name="Thomas Legrand" 
            role="Responsable Immobilier-BTP" 
            imageUrl="https://images.unsplash.com/photo-1556157382-97eda2d62296" 
          />
          <TeamMember 
            name="Sophie Moreau" 
            role="Directrice Marketing & Publicité" 
            imageUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956" 
          />
        </div>
      </div>
    </section>
  );
};

export default Team;
