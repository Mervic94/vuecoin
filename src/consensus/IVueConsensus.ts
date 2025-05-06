
/**
 * Interface for all VueConsensus consensus mechanisms
 */
export interface IVueConsensus {
  // Core consensus methods
  validateTransaction(data: any): Promise<boolean>;
  allocateResources(marketConditions: MarketCondition): Promise<AllocationResult>;
  adjustParameters(conditions: MarketCondition): void;
  getName(): string;
  getDescription(): string;
  
  // Performance metrics
  getEfficiencyScore(): number;
  getSustainabilityScore(): number;
  getAdaptabilityScore(): number;
  
  // Sector-specific validation rule
  applySectorRules(transaction: any): Promise<ValidationResult>;
}

export interface MarketCondition {
  currentPrice: number;
  marketTrend: 'bullish' | 'bearish' | 'stable';
  volatilityIndex: number;
  sectorPerformance: number;
  externalFactors: Record<string, number>;
  timestamp: number;
}

export interface AllocationResult {
  development: number;
  reserves: number;
  stakeholders: number;
  community: number;
  sustainability: number;
}

export interface ValidationResult {
  valid: boolean;
  reason?: string;
  score: number;
}
