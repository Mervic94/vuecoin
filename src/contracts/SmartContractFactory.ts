
import { BaseSmartContract } from './BaseSmartContract';
import { BuildSmartContract } from './BuildSmartContract';
import { TransSmartContract } from './TransSmartContract';
import { AdSmartContract } from './AdSmartContract';
import { ComSmartContract } from './ComSmartContract';

/**
 * Factory class for creating sector-specific smart contracts
 */
export class SmartContractFactory {
  /**
   * Creates a smart contract instance for the specified sector
   */
  static createContract(sector: string): BaseSmartContract {
    switch (sector.toLowerCase()) {
      case 'real-estate':
      case 'realestate':
      case 'build':
        return new BuildSmartContract();
        
      case 'renewable-energy':
      case 'renewableenergy':
      case 'energy':
      case 'trans':
        return new TransSmartContract();
        
      case 'agriculture':
      case 'sustainable-agriculture':
      case 'ad':
        return new AdSmartContract();
        
      case 'health':
      case 'healthcare':
      case 'health-technology':
      case 'com':
        return new ComSmartContract();
        
      default:
        throw new Error(`Unknown sector: ${sector}. Valid sectors are: real-estate, renewable-energy, agriculture, health-technology`);
    }
  }
}
