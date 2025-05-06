
import { BaseSmartContract, AllocationPlan, Transaction, ValidationResult } from './BaseSmartContract';

/**
 * BuildSmart - Smart Contract for Real Estate Sector
 * Manages allocation and validation for real estate investments
 */
export class BuildSmartContract extends BaseSmartContract {
  private constructionCostMultiplier: number = 1.0;
  private sustainabilityRequirement: number = 0.7;
  private energyEfficiencyMinimum: number = 0.65;
  private affordableHousingBonus: number = 1.2;
  
  // Market-responsive parameters
  private marketTrendMultiplier: number = 1.0;
  private propertyTypeDemandFactors: Record<string, number> = {
    residential: 1.0,
    commercial: 0.9,
    industrial: 0.85,
    mixed: 1.1
  };
  
  constructor() {
    super("BuildSmart", "real-estate");
  }

  /**
   * Evaluates real estate market conditions and adjusts contract parameters
   */
  evaluateMarketConditions(marketData: any): void {
    // Adjust parameters based on construction costs
    if (marketData.constructionCostIndex > 110) {
      this.constructionCostMultiplier = 1.2;
    } else if (marketData.constructionCostIndex < 90) {
      this.constructionCostMultiplier = 0.9;
    } else {
      this.constructionCostMultiplier = 1.0;
    }
    
    // Adjust for market trend
    if (marketData.marketTrend === 'growing') {
      this.marketTrendMultiplier = 1.15;
    } else if (marketData.marketTrend === 'contracting') {
      this.marketTrendMultiplier = 0.85;
    } else {
      this.marketTrendMultiplier = 1.0;
    }
    
    // Update property type demand factors based on market analysis
    if (marketData.propertyDemandFactors) {
      this.propertyTypeDemandFactors = {
        ...this.propertyTypeDemandFactors,
        ...marketData.propertyDemandFactors
      };
    }
    
    // Update sustainability requirements based on regulations
    if (marketData.sustainabilityRegulationLevel > 0.8) {
      this.sustainabilityRequirement = 0.8;
      this.energyEfficiencyMinimum = 0.75;
    } else if (marketData.sustainabilityRegulationLevel < 0.5) {
      this.sustainabilityRequirement = 0.65;
      this.energyEfficiencyMinimum = 0.6;
    }
    
    this.updateContract();
  }

  /**
   * Allocates resources to different funds based on real estate market conditions
   */
  allocateResources(amount: number, conditions: any): AllocationPlan {
    let developmentPercentage = 0.4 * this.marketTrendMultiplier;
    
    // Adjust based on property market conditions
    if (conditions.propertyType && this.propertyTypeDemandFactors[conditions.propertyType]) {
      developmentPercentage *= this.propertyTypeDemandFactors[conditions.propertyType];
    }
    
    // Adjust for sustainability initiatives
    if (conditions.isSustainable) {
      developmentPercentage *= 1.1;
    }
    
    // Adjust for affordable housing
    if (conditions.isAffordableHousing) {
      developmentPercentage *= this.affordableHousingBonus;
    }
    
    // Cap the development percentage
    developmentPercentage = Math.min(developmentPercentage, 0.6);
    developmentPercentage = Math.max(developmentPercentage, 0.25);
    
    // Calculate stability reserve (higher during volatile markets)
    const stabilityPercentage = conditions.marketVolatility > 0.6 ? 0.25 : 0.2;
    
    // Calculate stakeholder rewards
    const stakeholderPercentage = 0.15;
    
    // Community initiatives gets the remainder
    const communityPercentage = 1 - (developmentPercentage + stabilityPercentage + stakeholderPercentage);
    
    return {
      developmentFund: amount * developmentPercentage,
      stabilityReserve: amount * stabilityPercentage,
      stakeholderRewards: amount * stakeholderPercentage,
      communityInitiatives: amount * communityPercentage
    };
  }

  /**
   * Validates a real estate transaction against BuildSmart rules
   */
  async validateTransaction(transaction: Transaction): Promise<ValidationResult> {
    const { metadata } = transaction;
    
    // Required fields for real estate transactions
    if (!metadata.propertyType || !metadata.location || !metadata.value) {
      return {
        valid: false,
        reason: "Missing required property information",
        score: 0
      };
    }
    
    let score = 50; // Base score
    
    // Score sustainability factors
    if (metadata.sustainabilityScore >= this.sustainabilityRequirement) {
      score += 15;
    } else if (!metadata.sustainabilityScore) {
      score -= 10;
    }
    
    // Score energy efficiency
    if (metadata.energyEfficiency >= this.energyEfficiencyMinimum) {
      score += 15;
    } else if (!metadata.energyEfficiency) {
      score -= 5;
    }
    
    // Score affordable housing
    if (metadata.isAffordableHousing) {
      score += 20;
    }
    
    // Apply property type factor
    if (metadata.propertyType && this.propertyTypeDemandFactors[metadata.propertyType]) {
      score *= this.propertyTypeDemandFactors[metadata.propertyType];
    }
    
    // Validate transaction
    const valid = score >= 60;
    
    return {
      valid,
      reason: valid ? "Property meets BuildSmart requirements" : "Property does not meet minimum standards",
      score
    };
  }
}
