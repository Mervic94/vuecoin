
import React from 'react';

interface RoadmapItemProps {
  phase: string;
  period: string;
  title: string;
  description: string;
  isLeft?: boolean;
}

const RoadmapItem = ({ phase, period, title, description, isLeft = true }: RoadmapItemProps) => {
  return (
    <div className={`relative mb-8 md:mb-0 ${isLeft ? 'md:pr-12' : 'md:pl-12 md:ml-auto'} md:w-1/2`}>
      <div className={`p-6 bg-white rounded-lg shadow-md relative timeline-dot ${isLeft ? 'timeline-dot-left' : 'timeline-dot-right'}`}>
        <div className="text-secondary font-semibold mb-1">{phase}: {period}</div>
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Feuille de Route</h2>
          <p className="text-muted-foreground text-lg">
            Notre plan de développement et de déploiement de l'écosystème VueCoin.
          </p>
        </div>

        <div className="relative md:before:content-[''] md:before:absolute md:before:w-[2px] md:before:h-full md:before:bg-secondary md:before:left-1/2 md:before:-ml-[1px]">
          <div className="flex flex-col md:flex-row md:flex-wrap">
            <RoadmapItem 
              phase="Phase 1" 
              period="T3 2025 - T1 2026" 
              title="Fondation" 
              description="Développement de la blockchain VueCoin Core, déploiement des smart contracts fondamentaux, lancement du token VUE et premiers partenariats sectoriels."
              isLeft={true}
            />
            <RoadmapItem 
              phase="Phase 2" 
              period="T2 2026 - T4 2026" 
              title="Croissance" 
              description="Déploiement des plateformes VueAd et VueMarket, intégration avec partenaires de transport, premiers projets pilotes immobiliers."
              isLeft={false}
            />
            <RoadmapItem 
              phase="Phase 3" 
              period="T1 2027 - T4 2027" 
              title="Expansion" 
              description="Lancement complet de l'écosystème dans les quatre secteurs, intégration avec acteurs majeurs, déploiement international et transition vers la gouvernance DAO."
              isLeft={true}
            />
            <RoadmapItem 
              phase="Phase 4" 
              period="2028 et au-delà" 
              title="Maturité" 
              description="Gouvernance totalement décentralisée, développement d'applications sectorielles avancées, intégration avec systèmes financiers traditionnels."
              isLeft={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
