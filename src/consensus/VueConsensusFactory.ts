
import { IVueConsensus } from './IVueConsensus';
import { BuildConsensus } from './BuildConsensus';
import { TransConsensus } from './TransConsensus';
import { AdConsensus } from './AdConsensus';
import { ComConsensus } from './ComConsensus';

/**
 * Factory class for creating VueConsensus instances
 */
export class VueConsensusFactory {
  /**
   * Creates a consensus mechanism instance for the specified sector
   */
  static createConsensus(sector: string): IVueConsensus {
    switch (sector.toLowerCase()) {
      case 'real-estate':
      case 'realestate':
      case 'build':
        return new BuildConsensus();
        
      case 'renewable-energy':
      case 'renewableenergy':
      case 'energy':
      case 'trans':
        return new TransConsensus();
        
      case 'agriculture':
      case 'sustainable-agriculture':
      case 'ad':
        return new AdConsensus();
        
      case 'health':
      case 'healthcare':
      case 'health-technology':
      case 'com':
        return new ComConsensus();
        
      default:
        throw new Error(`Unknown sector: ${sector}. Valid sectors are: real-estate, renewable-energy, agriculture, health-technology`);
    }
  }
}
