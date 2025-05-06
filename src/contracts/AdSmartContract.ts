
import { BaseSmartContract, AllocationPlan, Transaction, ValidationResult } from './BaseSmartContract';

/**
 * AdSmart - Smart Contract for Sustainable Agriculture Sector
 * Manages allocation and validation for agricultural investments
 */
export class AdSmartContract extends BaseSmartContract {
  private waterConservationMultiplier: number = 1.2;
  private biodiversityRequirement: number = 0.6;
  private organicFarmingBonus: number = 1.25;
  private smallholderFarmerFactor: number = 1.15;
  
  // Market-responsive parameters
  private foodSecurityFactor: number = 1.0;
  private farmingMethodFactors: Record<string, number> = {
    organic: 1.3,
    regenerative: 1.4,
    conventional: 0.8,
    permaculture: 1.35,
    hydroponics: 1.1,
    vertical: 1.2
  };
  
  constructor() {
    super("AdSmart", "sustainable-agriculture");
  }

  /**
   * Evaluates agricultural market conditions and adjusts contract parameters
   */
  evaluateMarketConditions(marketData: any): void {
    // Adjust parameters based on food security index
    if (marketData.foodSecurityIndex < 0.6) {
      this.foodSecurityFactor = 1.3; // Increase emphasis during food insecurity
    } else if (marketData.foodSecurityIndex > 0.85) {
      this.foodSecurityFactor = 0.9; // Decrease emphasis during high food security
    } else {
      this.foodSecurityFactor = 1.0;
    }
    
    // Adjust water conservation requirements based on water scarcity
    if (marketData.waterScarcityIndex > 0.7) {
      this.waterConservationMultiplier = 1.4;
    } else if (marketData.waterScarcityIndex < 0.3) {
      this.waterConservationMultiplier = 1.0;
    } else {
      this.waterConservationMultiplier = 1.2;
    }
    
    // Update farming method factors based on market trends and research
    if (marketData.organicPremium > 1.2) {
      this.farmingMethodFactors.organic = 1.4;
      this.organicFarmingBonus = 1.35;
    } else if (marketData.organicPremium < 0.9) {
      this.farmingMethodFactors.organic = 1.2;
      this.organicFarmingBonus = 1.15;
    }
    
    // Adjust smallholder farmer support based on policy
    if (marketData.smallholderSupportIndex > 0.6) {
      this.smallholderFarmerFactor = 1.25;
    } else {
      this.smallholderFarmerFactor = 1.15;
    }
    
    this.updateContract();
  }

  /**
   * Allocates resources to different funds based on agricultural market conditions
   */
  allocateResources(amount: number, conditions: any): AllocationPlan {
    let developmentPercentage = 0.35 * this.foodSecurityFactor;
    
    // Adjust based on farming method
    if (conditions.farmingMethod && this.farmingMethodFactors[conditions.farmingMethod]) {
      developmentPercentage *= this.farmingMethodFactors[conditions.farmingMethod];
    }
    
    // Adjust for water conservation initiatives
    if (conditions.waterConservation) {
      developmentPercentage *= this.waterConservationMultiplier;
    }
    
    // Adjust for organic farming
    if (conditions.isOrganic) {
      developmentPercentage *= this.organicFarmingBonus;
    }
    
    // Adjust for smallholder farmer support
    if (conditions.supportsSmallholders) {
      developmentPercentage *= this.smallholderFarmerFactor;
    }
    
    // Cap the development percentage
    developmentPercentage = Math.min(developmentPercentage, 0.6);
    developmentPercentage = Math.max(developmentPercentage, 0.25);
    
    // Calculate stability reserve
    const stabilityPercentage = 0.15;
    
    // Calculate stakeholder rewards
    const stakeholderPercentage = 0.15;
    
    // Community initiatives gets the remainder - higher for agriculture
    const communityPercentage = 1 - (developmentPercentage + stabilityPercentage + stakeholderPercentage);
    
    return {
      developmentFund: amount * developmentPercentage,
      stabilityReserve: amount * stabilityPercentage,
      stakeholderRewards: amount * stakeholderPercentage,
      communityInitiatives: amount * communityPercentage
    };
  }

  /**
   * Validates an agricultural transaction against AdSmart rules
   */
  async validateTransaction(transaction: Transaction): Promise<ValidationResult> {
    const { metadata } = transaction;
    
    // Required fields for agricultural transactions
    if (!metadata.farmingMethod || !metadata.location) {
      return {
        valid: false,
        reason: "Missing required agricultural project information",
        score: 0
      };
    }
    
    let score = 50; // Base score
    
    // Score farming method
    if (metadata.farmingMethod && this.farmingMethodFactors[metadata.farmingMethod]) {
      score += 20 * this.farmingMethodFactors[metadata.farmingMethod];
    } else {
      score -= 10; // Penalty for non-recognized methods
    }
    
    // Score water conservation
    if (metadata.waterEfficiency > 0.7) {
      score += 15 * this.waterConservationMultiplier;
    }
    
    // Score biodiversity protection
    if (metadata.biodiversityScore >= this.biodiversityRequirement) {
      score += 20;
    } else if (metadata.biodiversityScore) {
      score += 10 * (metadata.biodiversityScore / this.biodiversityRequirement);
    }
    
    // Score for pesticide usage (negative impact)
    if (metadata.usesPesticides) {
      score -= 20;
    }
    
    // Score for soil health practices
    if (metadata.soilHealthPractices) {
      score += 15;
    }
    
    // Score for smallholder farmer support
    if (metadata.supportsSmallholders) {
      score += 10;
    }
    
    // Validate transaction
    const valid = score >= 65;
    
    return {
      valid,
      reason: valid ? "Agricultural project meets AdSmart requirements" : "Agricultural project does not meet minimum standards",
      score
    };
  }
}
