
export interface Testimonial {
  id: string;
  company: string;
  sector: 'advertising' | 'real-estate' | 'transport' | 'ecommerce';
  logo: string;
  contactPerson: {
    name: string;
    position: string;
    photo: string;
  };
  metrics: {
    transactionVolume: string;
    costReduction: string;
    timeToSettlement: string;
    satisfactionScore: number;
  };
  quote: string;
  detailedFeedback: string;
  implementationDate: string;
  useCases: string[];
  challenges: string;
  results: string;
  futureProjects: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    company: 'AdTech Solutions',
    sector: 'advertising',
    logo: '/assets/partners/adtech-logo.png',
    contactPerson: {
      name: 'Marie Dubois',
      position: 'Directrice Innovation',
      photo: '/assets/team/marie-dubois.jpg'
    },
    metrics: {
      transactionVolume: '2.5M VUE/mois',
      costReduction: '35%',
      timeToSettlement: '< 30 secondes',
      satisfactionScore: 4.8
    },
    quote: "VueCoin a révolutionné notre façon de gérer les paiements publicitaires. La transparence et la rapidité des transactions nous permettent de nous concentrer sur notre cœur de métier.",
    detailedFeedback: "Avant VueCoin, nous perdions énormément de temps et d'argent dans les frais de transaction traditionnels. Aujourd'hui, nos campagnes publicitaires sont plus efficaces et nos partenaires sont payés en temps réel.",
    implementationDate: '2023-06',
    useCases: [
      'Paiements automatisés aux créateurs de contenu',
      'Gestion des revenus publicitaires',
      'Micro-transactions pour les clics'
    ],
    challenges: 'Intégration avec les systèmes legacy et formation des équipes.',
    results: 'Augmentation de 40% de la satisfaction des partenaires et réduction de 60% du temps de traitement des paiements.',
    futureProjects: 'Extension vers les campagnes internationales et intégration de l\'IA pour les paiements prédictifs.'
  },
  {
    id: '2',
    company: 'ImmoBuild Pro',
    sector: 'real-estate',
    logo: '/assets/partners/immobuild-logo.png',
    contactPerson: {
      name: 'Jean-Pierre Martin',
      position: 'CEO',
      photo: '/assets/team/jean-pierre-martin.jpg'
    },
    metrics: {
      transactionVolume: '150M VUE/an',
      costReduction: '28%',
      timeToSettlement: '2 heures',
      satisfactionScore: 4.9
    },
    quote: "Grâce à VueCoin, nous avons pu dématérialiser complètement nos transactions immobilières. Fini les délais d'attente interminables !",
    detailedFeedback: "La blockchain VueCoin nous a permis de créer des contrats intelligents pour nos ventes immobilières. Les acheteurs et vendeurs apprécient la transparence et la sécurité offertes.",
    implementationDate: '2023-09',
    useCases: [
      'Smart contracts pour les ventes immobilières',
      'Paiements d\'acomptes automatisés',
      'Gestion des commissions d\'agence'
    ],
    challenges: 'Adaptation de la réglementation locale et éducation des clients.',
    results: 'Réduction de 50% du temps de finalisation des ventes et amélioration de la confiance client.',
    futureProjects: 'Tokenisation des biens immobiliers et plateforme de crowdfunding immobilier.'
  },
  {
    id: '3',
    company: 'TransLogistics Global',
    sector: 'transport',
    logo: '/assets/partners/translogistics-logo.png',
    contactPerson: {
      name: 'Ahmed Ben Salem',
      position: 'Directeur Technique',
      photo: '/assets/team/ahmed-ben-salem.jpg'
    },
    metrics: {
      transactionVolume: '8.2M VUE/mois',
      costReduction: '42%',
      timeToSettlement: '15 minutes',
      satisfactionScore: 4.7
    },
    quote: "VueCoin nous a permis de créer un écosystème de paiement unifié pour tous nos partenaires transporteurs à travers le monde.",
    detailedFeedback: "La gestion multi-devises était notre plus gros défi. VueCoin a simplifié nos opérations internationales et amélioré nos marges.",
    implementationDate: '2023-08',
    useCases: [
      'Paiements internationaux de fret',
      'Rémunération des chauffeurs',
      'Gestion des péages automatisés'
    ],
    challenges: 'Intégration avec les systèmes de tracking et formation internationale.',
    results: 'Augmentation de 30% de l\'efficacité opérationnelle et expansion sur 15 nouveaux pays.',
    futureProjects: 'Système de loyalty pour les chauffeurs et plateforme de booking décentralisée.'
  },
  {
    id: '4',
    company: 'E-Market Plus',
    sector: 'ecommerce',
    logo: '/assets/partners/emarket-logo.png',
    contactPerson: {
      name: 'Sophie Chen',
      position: 'Head of Payments',
      photo: '/assets/team/sophie-chen.jpg'
    },
    metrics: {
      transactionVolume: '45M VUE/mois',
      costReduction: '38%',
      timeToSettlement: '< 10 secondes',
      satisfactionScore: 4.8
    },
    quote: "L'intégration de VueCoin a transformé l'expérience d'achat de nos clients. Les paiements instantanés ont considérablement réduit l'abandon de panier.",
    detailedFeedback: "Nos clients apprécient la rapidité et la sécurité des paiements VueCoin. Nous avons observé une augmentation significative de la conversion et de la fidélité.",
    implementationDate: '2023-07',
    useCases: [
      'Paiements instantanés en ligne',
      'Programme de cashback en VUE',
      'Paiements aux marchands'
    ],
    challenges: 'Intégration avec les systèmes de CRM existants et gestion des retours.',
    results: 'Augmentation de 25% du taux de conversion et réduction de 45% des abandons de panier.',
    futureProjects: 'Marketplace décentralisée et système de notation blockchain des vendeurs.'
  }
];

export const partnerStats = {
  totalPartners: 47,
  totalTransactionVolume: '1.2B VUE',
  averageCostReduction: '36%',
  averageSatisfactionScore: 4.8,
  sectorsRepresented: 4
};
