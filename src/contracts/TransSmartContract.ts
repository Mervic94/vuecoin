
import { BaseSmartContract, AllocationPlan, Transaction, ValidationResult } from './BaseSmartContract';

/**
 * TransSmart - Smart Contract for Renewable Energy Sector
 * Manages allocation and validation for renewable energy investments
 */
export class TransSmartContract extends BaseSmartContract {
  private energyEfficiencyMultiplier: number = 1.0;
  private carbonOffsetRequirement: number = 0.5;
  private renewableSourceBonus: number = 1.3;
  private gridIntegrationFactor: number = 1.1;
  
  // Market-responsive parameters
  private energyDemandTrendFactor: number = 1.0;
  private energySourceFactors: Record<string, number> = {
    solar: 1.2,
    wind: 1.15,
    hydro: 1.0,
    geothermal: 1.1,
    biomass: 0.9,
    tidal: 1.05
  };
  
  constructor() {
    super("TransSmart", "renewable-energy");
  }

  /**
   * Evaluates energy market conditions and adjusts contract parameters
   */
  evaluateMarketConditions(marketData: any): void {
    // Adjust parameters based on energy demand trends
    if (marketData.energyDemandGrowth > 5) {
      this.energyDemandTrendFactor = 1.2;
    } else if (marketData.energyDemandGrowth < 0) {
      this.energyDemandTrendFactor = 0.9;
    } else {
      this.energyDemandTrendFactor = 1.0;
    }
    
    // Adjust carbon offset requirements based on carbon pricing
    if (marketData.carbonPricePerTon > 50) {
      this.carbonOffsetRequirement = 0.6;
    } else if (marketData.carbonPricePerTon < 20) {
      this.carbonOffsetRequirement = 0.4;
    } else {
      this.carbonOffsetRequirement = 0.5;
    }
    
    // Update energy source factors based on policy incentives
    if (marketData.policyIncentives) {
      for (const [source, incentiveLevel] of Object.entries(marketData.policyIncentives)) {
        if (this.energySourceFactors[source]) {
          this.energySourceFactors[source] *= (1 + (incentiveLevel as number) * 0.1);
        }
      }
    }
    
    // Adjust grid integration factor based on grid stability
    if (marketData.gridStabilityIndex < 0.7) {
      this.gridIntegrationFactor = 1.3; // Higher bonus for grid stability solutions
    } else {
      this.gridIntegrationFactor = 1.1;
    }
    
    this.updateContract();
  }

  /**
   * Allocates resources to different funds based on energy market conditions
   */
  allocateResources(amount: number, conditions: any): AllocationPlan {
    let developmentPercentage = 0.45 * this.energyDemandTrendFactor;
    
    // Adjust based on energy source
    if (conditions.energySource && this.energySourceFactors[conditions.energySource]) {
      developmentPercentage *= this.energySourceFactors[conditions.energySource];
    }
    
    // Adjust for carbon offset initiatives
    if (conditions.carbonOffset > this.carbonOffsetRequirement) {
      developmentPercentage *= 1.1;
    }
    
    // Adjust for grid integration
    if (conditions.providesGridStability) {
      developmentPercentage *= this.gridIntegrationFactor;
    }
    
    // Storage capability bonus
    if (conditions.includesEnergyStorage) {
      developmentPercentage *= 1.15;
    }
    
    // Cap the development percentage
    developmentPercentage = Math.min(developmentPercentage, 0.7);
    developmentPercentage = Math.max(developmentPercentage, 0.3);
    
    // Calculate stability reserve (lower for renewable energy projects)
    const stabilityPercentage = 0.15;
    
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
   * Validates a renewable energy transaction against TransSmart rules
   */
  async validateTransaction(transaction: Transaction): Promise<ValidationResult> {
    const { metadata } = transaction;
    
    // Required fields for energy transactions
    if (!metadata.energySource || !metadata.capacity) {
      return {
        valid: false,
        reason: "Missing required energy project information",
        score: 0
      };
    }
    
    let score = 50; // Base score
    
    // Score energy source
    if (metadata.energySource && this.energySourceFactors[metadata.energySource]) {
      score += 20 * this.energySourceFactors[metadata.energySource];
    } else {
      score -= 10; // Penalty for non-recognized sources
    }
    
    // Score carbon offset
    if (metadata.carbonOffset >= this.carbonOffsetRequirement) {
      score += 15;
    }
    
    // Score grid integration
    if (metadata.providesGridStability) {
      score += 10;
    }
    
    // Score energy storage
    if (metadata.includesEnergyStorage) {
      score += 15;
    }
    
    // Score for local community benefits
    if (metadata.localCommunityBenefit) {
      score += 10;
    }
    
    // Validate transaction
    const valid = score >= 70;
    
    return {
      valid,
      reason: valid ? "Energy project meets TransSmart requirements" : "Energy project does not meet minimum standards",
      score
    };
  }
}
