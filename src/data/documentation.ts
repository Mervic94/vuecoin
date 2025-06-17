
export interface DocSection {
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
    content: `VueCoin est une cryptomonnaie révolutionnaire conçue pour démocratiser l'accès à la technologie blockchain. Notre mission est de créer un écosystème où la blockchain devient accessible à tous, des entreprises aux particuliers.

# Qu'est-ce qui rend VueCoin unique ?

VueCoin se distingue par son mécanisme de consensus Vue Consensus, qui combine efficacité énergétique et sécurité. Contrairement au Bitcoin qui consomme énormément d'énergie, VueCoin utilise 99% moins d'énergie tout en maintenant une sécurité de niveau comparable.

## Caractéristiques principales

- **Rapidité** : Transactions confirmées en 3 secondes
- **Économique** : Frais de transaction de 0.001 VC
- **Écologique** : Consommation d'énergie réduite de 99%
- **Accessible** : Interface utilisateur intuitive
- **Sécurisé** : Cryptographie de niveau militaire

## Cas d'usage principaux

VueCoin cible quatre secteurs stratégiques :
1. **Publicité décentralisée** : Récompenser les utilisateurs pour leur attention
2. **E-commerce** : Faciliter les paiements internationaux
3. **Transport** : Optimiser les systèmes de mobilité urbaine
4. **Construction** : Traçabilité des matériaux et automatisation des paiements`,
    level: 'beginner',
    category: 'Introduction'
  },
  {
    id: '2',
    title: 'Installation et configuration du portefeuille',
    content: `Ce guide vous accompagne dans l'installation et la configuration de votre premier portefeuille VueCoin.

# Créer un compte VueCoin

1. Rendez-vous sur la plateforme VueCoin
2. Cliquez sur "Créer un compte"
3. Renseignez vos informations personnelles
4. Vérifiez votre adresse email
5. Activez l'authentification à deux facteurs (2FA)

## Sécurisation de votre portefeuille

La sécurité de vos VueCoin est primordiale. Voici les bonnes pratiques :

**Phrase de récupération** : Notez votre phrase de 12 mots sur papier et conservez-la en lieu sûr. Ne la partagez jamais et ne la stockez pas numériquement.

**Authentification 2FA** : Activez obligatoirement l'authentification à deux facteurs avec Google Authenticator ou Authy.

**Vérification KYC** : Complétez votre vérification d'identité pour augmenter vos limites de transaction et accéder à toutes les fonctionnalités.

# Premier dépôt

Pour effectuer votre premier dépôt :
1. Accédez à la section "Financement"
2. Choisissez votre méthode de paiement
3. Saisissez le montant désiré
4. Confirmez la transaction

Les dépôts sont généralement traités en moins de 10 minutes.`,
    level: 'beginner',
    category: 'Guide utilisateur'
  },
  {
    id: '3',
    title: 'Architecture technique de VueCoin',
    content: `VueCoin s'appuie sur une architecture blockchain modulaire et scalable, conçue pour répondre aux défis actuels des cryptomonnaies.

# Vue Consensus : Notre algorithme de consensus

Le Vue Consensus combine trois mécanismes :

## 1. Proof of Stake hybride
Les validateurs sont sélectionnés en fonction de leur stake (mise) en VueCoin, mais aussi de leur réputation et contribution à l'écosystème.

## 2. Proof of Utility
Les participants qui contribuent activement à l'adoption de VueCoin (développement d'apps, intégration entreprise, éducation communautaire) gagnent des points d'utilité qui augmentent leurs chances d'être sélectionnés comme validateurs.

## 3. Gouvernance décentralisée
Les décisions importantes sont votées par la communauté via un système de DAO (Decentralized Autonomous Organization).

# Architecture en couches

**Couche 1 : Blockchain principale**
- Gestion des transactions VueCoin
- Consensus et validation
- Sécurité cryptographique

**Couche 2 : Contrats intelligents**
- AdSmartContract pour la publicité
- ComSmartContract pour le e-commerce
- TransSmartContract pour les transports
- BuildSmartContract pour la construction

**Couche 3 : Applications**
- Interface web VueCoin
- APIs pour développeurs
- SDKs multi-langages

# Spécifications techniques

```
Block time: 3 secondes
TPS: 1000 transactions par seconde
Taille de bloc: 2MB
Algorithme de hash: SHA-256 optimisé
Cryptographie: Courbes elliptiques secp256k1
````,
    level: 'advanced',
    category: 'Architecture'
  },
  {
    id: '4',
    title: 'Développement d\'applications avec le SDK VueCoin',
    content: `Le SDK VueCoin simplifie l'intégration de la blockchain dans vos applications. Ce guide détaille l'utilisation de nos outils de développement.

# Installation du SDK

```bash
npm install @vuecoin/sdk
# ou
yarn add @vuecoin/sdk
```

# Initialisation

```javascript
import { VueCoin } from '@vuecoin/sdk';

const vuecoin = new VueCoin({
  network: 'mainnet', // ou 'testnet'
  apiKey: 'votre-clé-api'
});
```

## Gestion des portefeuilles

```javascript
// Créer un nouveau portefeuille
const wallet = await vuecoin.wallet.create();

// Importer un portefeuille existant
const wallet = await vuecoin.wallet.import(privateKey);

// Obtenir le solde
const balance = await wallet.getBalance();
```

## Transactions

```javascript
// Envoyer des VueCoin
const transaction = await wallet.send({
  to: 'adresse-destinataire',
  amount: 100, // en VC
  fee: 0.001 // frais optionnels
});

// Vérifier le statut d'une transaction
const status = await vuecoin.transaction.getStatus(transaction.hash);
```

# Contrats intelligents

## Utilisation du contrat publicitaire

```javascript
import { AdContract } from '@vuecoin/sdk';

const adContract = new AdContract(vuecoin);

// Créer une campagne publicitaire
const campaign = await adContract.createCampaign({
  budget: 1000,
  targetAudience: ['crypto', 'tech'],
  duration: 30,
  rewardPerView: 0.01
});

// Obtenir les statistiques
const stats = await adContract.getCampaignStats(campaign.id);
```

# Testing et débogage

Le SDK inclut un environnement de test complet :

```javascript
import { TestNet } from '@vuecoin/sdk';

const testnet = new TestNet();
await testnet.start();

// Utiliser des VueCoin de test
const testWallet = await testnet.getFaucet(1000);
````,
    level: 'intermediate',
    category: 'Développement'
  },
  {
    id: '5',
    title: 'Intégration e-commerce avec VueCoin',
    content: `Guide complet pour intégrer VueCoin comme moyen de paiement dans votre boutique en ligne.

# Avantages de VueCoin pour l'e-commerce

- **Frais réduits** : 0.1% vs 2-3% pour les cartes bancaires
- **Paiements instantanés** : Confirmation en 3 secondes
- **International** : Pas de conversion de devises
- **Sécurisé** : Impossible de faire des rétrofacturations frauduleuses
- **Programmable** : Contrats intelligents pour automatiser les processus

# Installation du plugin e-commerce

## Pour WooCommerce (WordPress)

1. Téléchargez le plugin VueCoin
2. Uploadez-le dans /wp-content/plugins/
3. Activez le plugin dans l'admin WordPress
4. Configurez vos clés API VueCoin

## Pour Shopify

```javascript
// Ajouter le script VueCoin dans le thème
<script src="https://cdn.vuecoin.dev/checkout.js"></script>

// Initialiser le paiement
VueCoin.init({
  apiKey: 'votre-clé-publique',
  environment: 'production'
});
```

# Implémentation personnalisée

Pour une intégration sur mesure :

```javascript
import { VueCoin, ComContract } from '@vuecoin/sdk';

const vuecoin = new VueCoin({ network: 'mainnet' });
const comContract = new ComContract(vuecoin);

// Créer une commande
const order = await comContract.createOrder({
  items: [
    { sku: 'PROD001', quantity: 2, price: 50 },
    { sku: 'PROD002', quantity: 1, price: 25 }
  ],
  customer: customerWallet,
  merchant: merchantWallet
});

// Le contrat intelligent gère automatiquement :
// - Vérification du paiement
// - Libération des fonds au marchand
// - Gestion des remboursements
// - Programme de fidélité
```

## Gestion des remboursements

```javascript
// Remboursement automatique via contrat intelligent
const refund = await comContract.processRefund({
  orderId: order.id,
  amount: 75, // remboursement partiel
  reason: 'Article défectueux'
});
```

# Programme de fidélité tokenisé

```javascript
// Les clients gagnent des VC sur chaque achat
const loyaltyPoints = await comContract.calculateLoyalty({
  orderAmount: 100,
  customerTier: 'gold'
});

// Utilisation des points
await comContract.redeemLoyalty({
  customer: customerWallet,
  points: 50
});
```

Cette intégration permet de réduire drastiquement les coûts de transaction tout en améliorant l'expérience client.`,
    level: 'intermediate',
    category: 'E-commerce'
  }
];
