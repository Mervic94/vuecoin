
interface DocSection {
  id: string;
  title: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export const documentationSections: DocSection[] = [
  {
    id: '1',
    title: 'Introduction à VueCoin',
    content: `VueCoin est une cryptomonnaie révolutionnaire qui tire sa force de quatre secteurs clés : la publicité, l'immobilier-BTP, le transport et l'e-commerce.

Cette approche multi-sectorielle garantit une stabilité accrue et des opportunités de croissance diversifiées pour tous les utilisateurs de l'écosystème VueCoin.

# Caractéristiques principales

- **Stabilité renforcée** : Adossée à des secteurs économiques solides
- **Écosystème diversifié** : Multiple sources de valeur
- **Innovation blockchain** : Technologie de pointe pour les transactions`,
    level: 'beginner',
    category: 'Introduction'
  },
  {
    id: '2',
    title: 'Configuration de votre premier portefeuille',
    content: `Pour commencer avec VueCoin, vous devez d'abord configurer votre portefeuille numérique.

# Étapes de configuration

## 1. Création du compte
Rendez-vous sur la page d'inscription et créez votre compte avec une adresse email valide.

## 2. Vérification d'identité
Complétez le processus KYC (Know Your Customer) pour sécuriser votre compte.

## 3. Configuration 2FA
Activez l'authentification à deux facteurs pour une sécurité maximale.

\`\`\`javascript
// Exemple d'initialisation du portefeuille
const wallet = new VueCoinWallet({
  userId: 'your-user-id',
  currency: 'VUE'
});
\`\`\``,
    level: 'beginner',
    category: 'Guide de démarrage'
  },
  {
    id: '3',
    title: 'API de trading avancée',
    content: `L'API VueCoin permet d'intégrer facilement les fonctionnalités de trading dans vos applications.

# Endpoints principaux

## Authentification
\`\`\`
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}
\`\`\`

## Passage d'ordres
\`\`\`
POST /api/orders
Authorization: Bearer token

{
  "type": "market",
  "side": "buy",
  "amount": 100,
  "price": 1.50
}
\`\`\`

# Gestion des erreurs
L'API retourne des codes d'erreur standardisés pour faciliter le debugging.`,
    level: 'advanced',
    category: 'API'
  },
  {
    id: '4',
    title: 'Consensus VueConsensus',
    content: `Le mécanisme de consensus VueConsensus est au cœur de la blockchain VueCoin.

# Fonctionnement

Le VueConsensus utilise une approche hybride combinant :
- Proof of Stake (PoS) pour l'efficacité énergétique
- Validation par secteur pour la décentralisation
- Smart contracts pour l'automatisation

## Participation au consensus

\`\`\`typescript
interface ConsensusParticipant {
  address: string;
  stake: number;
  sector: 'advertising' | 'real-estate' | 'transport' | 'ecommerce';
}
\`\`\`

# Récompenses
Les participants au consensus reçoivent des récompenses proportionnelles à leur contribution.`,
    level: 'intermediate',
    category: 'Blockchain'
  },
  {
    id: '5',
    title: 'Smart Contracts VueCoin',
    content: `Les smart contracts VueCoin permettent d'automatiser les transactions dans les quatre secteurs supportés.

# Déploiement d'un contrat

\`\`\`solidity
pragma solidity ^0.8.0;

contract VueAdvertising {
    mapping(address => uint256) public revenues;
    
    function distributeRevenue(address[] memory advertisers, uint256[] memory amounts) public {
        require(advertisers.length == amounts.length, "Arrays must have same length");
        
        for (uint i = 0; i < advertisers.length; i++) {
            revenues[advertisers[i]] += amounts[i];
        }
    }
}
\`\`\`

# Interaction avec les contrats
Utilisez l'API VueCoin pour interagir avec vos smart contracts déployés.`,
    level: 'advanced',
    category: 'Smart Contracts'
  }
];
