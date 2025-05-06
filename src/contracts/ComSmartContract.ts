
import { BaseSmartContract, AllocationPlan, Transaction, ValidationResult } from './BaseSmartContract';

/**
 * ComSmart - Smart Contract for Health Technologies Sector
 * Manages allocation and validation for healthcare technology investments
 */
export class ComSmartContract extends BaseSmartContract {
  private accessibilityRequirement: number = 0.7;
  private clinicalEvidenceMinimum: number = 0.65;
  private preventiveCareBonus: number = 1.3;
  private dataPrivacyFactor: number = 1.2;
  
  // Market-responsive parameters
  private healthcareNeedFactor: number = 1.0;
  private healthTechCategoryFactors: Record<string, number> = {
    preventive: 1.4,
    diagnostic: 1.2,
    treatment: 1.1,
    telehealth: 1.25,
    monitoring: 1.15,
    supportive: 1.0,
    research: 1.3
  };
  
  constructor() {
    super("ComSmart", "health-technology");
  }

  /**
   * Evaluates healthcare market conditions and adjusts contract parameters
   */
  evaluateMarketConditions(marketData: any): void {
    // Adjust parameters based on global healthcare needs
    if (marketData.globalHealthcareNeedsIndex > 0.8) {
      this.healthcareNeedFactor = 1.3; // Increase emphasis during high healthcare needs
    } else if (marketData.globalHealthcareNeedsIndex < 0.5) {
      this.healthcareNeedFactor = 0.9; // Decrease emphasis during low healthcare needs
    } else {
      this.healthcareNeedFactor = 1.0;
    }
    
    // Adjust accessibility requirements based on healthcare access inequality
    if (marketData.healthcareAccessInequality > 0.7) {
      this.accessibilityRequirement = 0.8; // Higher requirements when inequality is high
    } else if (marketData.healthcareAccessInequality < 0.4) {
      this.accessibilityRequirement = 0.65; // Lower requirements when inequality is low
    } else {
      this.accessibilityRequirement = 0.7;
    }
    
    // Update health tech category factors based on healthcare trends
    if (marketData.pandemicRiskLevel > 0.6) {
      this.healthTechCategoryFactors.diagnostic = 1.4;
      this.healthTechCategoryFactors.telehealth = 1.5;
      this.healthTechCategoryFactors.monitoring = 1.3;
    } else {
      this.healthTechCategoryFactors.preventive = 1.4;
      this.healthTechCategoryFactors.diagnostic = 1.2;
      this.healthTechCategoryFactors.telehealth = 1.25;
    }
    
    // Adjust clinical evidence requirements based on regulatory environment
    if (marketData.regulatoryStringency > 0.8) {
      this.clinicalEvidenceMinimum = 0.75;
    } else if (marketData.regulatoryStringency < 0.5) {
      this.clinicalEvidenceMinimum = 0.6;
    } else {
      this.clinicalEvidenceMinimum = 0.65;
    }
    
    // Adjust data privacy factor based on data regulation trends
    if (marketData.dataPrivacyRegulationLevel > 0.7) {
      this.dataPrivacyFactor = 1.4;
    } else {
      this.dataPrivacyFactor = 1.2;
    }
    
    this.updateContract();
  }

  /**
   * Allocates resources to different funds based on healthcare market conditions
   */
  allocateResources(amount: number, conditions: any): AllocationPlan {
    let developmentPercentage = 0.5 * this.healthcareNeedFactor;
    
    // Adjust based on health tech category
    if (conditions.techCategory && this.healthTechCategoryFactors[conditions.techCategory]) {
      developmentPercentage *= this.healthTechCategoryFactors[conditions.techCategory];
    }
    
    // Adjust for accessibility initiatives
    if (conditions.accessibilityScore >= this.accessibilityRequirement) {
      developmentPercentage *= 1.1;
    }
    
    // Adjust for preventive care focus
    if (conditions.isPreventiveFocused) {
      developmentPercentage *= this.preventiveCareBonus;
    }
    
    // Adjust for clinical evidence quality
    if (conditions.clinicalEvidenceLevel > this.clinicalEvidenceMinimum) {
      developmentPercentage *= 1.15;
    }
    
    // Adjust for data privacy measures
    if (conditions.dataPrivacyScore > 0.8) {
      developmentPercentage *= this.dataPrivacyFactor;
    }
    
    // Cap the development percentage
    developmentPercentage = Math.min(developmentPercentage, 0.7);
    developmentPercentage = Math.max(developmentPercentage, 0.35);
    
    // Calculate stability reserve
    const stabilityPercentage = 0.15;
    
    // Calculate stakeholder rewards
    const stakeholderPercentage = 0.10;
    
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
   * Validates a health tech transaction against ComSmart rules
   */
  async validateTransaction(transaction: Transaction): Promise<ValidationResult> {
    const { metadata } = transaction;
    
    // Required fields for health tech transactions
    if (!metadata.techCategory || !metadata.targetPopulation) {
      return {
        valid: false,
        reason: "Missing required health technology information",
        score: 0
      };
    }
    
    let score = 50; // Base score
    
    // Score health tech category
    if (metadata.techCategory && this.healthTechCategoryFactors[metadata.techCategory]) {
      score += 15 * this.healthTechCategoryFactors[metadata.techCategory];
    } else {
      score -= 5; // Minor penalty for non-recognized categories
    }
    
    // Score accessibility
    if (metadata.accessibilityScore >= this.accessibilityRequirement) {
      score += 20;
    } else if (metadata.accessibilityScore) {
      score += 10 * (metadata.accessibilityScore / this.accessibilityRequirement);
    }
    
    // Score clinical evidence
    if (metadata.clinicalEvidenceLevel >= this.clinicalEvidenceMinimum) {
      score += 25;
    } else if (metadata.clinicalEvidenceLevel) {
      score += 15 * (metadata.clinicalEvidenceLevel / this.clinicalEvidenceMinimum);
    } else {
      score -= 20; // Significant penalty for no clinical evidence
    }
    
    // Score for data privacy
    if (metadata.dataPrivacyScore > 0.8) {
      score += 15;
    } else if (metadata.dataPrivacyScore < 0.5) {
      score -= 10;
    }
    
    // Score for cost effectiveness
    if (metadata.costEffectiveness > 1.5) {
      score += 15;
    }
    
    // Score for patient outcome improvement
    if (metadata.patientOutcomeImprovement > 0.3) {
      score += 20;
    } else if (metadata.patientOutcomeImprovement > 0.1) {
      score += 10;
    }
    
    // Validate transaction
    const valid = score >= 75; // Higher threshold for health technologies
    
    return {
      valid,
      reason: valid ? "Health technology meets ComSmart requirements" : "Health technology does not meet minimum standards",
      score
    };
  }
}
