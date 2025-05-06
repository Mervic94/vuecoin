
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VueConsensusFactory } from '@/consensus/VueConsensusFactory';
import { SmartContractFactory } from '@/contracts/SmartContractFactory';

const VueConsensusPage = () => {
  const [currentTab, setCurrentTab] = useState('build');
  
  // Create the consensus mechanisms
  const buildConsensus = VueConsensusFactory.createConsensus('build');
  const transConsensus = VueConsensusFactory.createConsensus('trans');
  const adConsensus = VueConsensusFactory.createConsensus('ad');
  const comConsensus = VueConsensusFactory.createConsensus('com');
  
  // Create the smart contracts
  const buildContract = SmartContractFactory.createContract('build');
  const transContract = SmartContractFactory.createContract('trans');
  const adContract = SmartContractFactory.createContract('ad');
  const comContract = SmartContractFactory.createContract('com');

  // Helper to get description for each consensus
  const getConsensusDescription = (name: string) => {
    switch(name) {
      case 'build':
        return "Consensus for the real estate sector focusing on sustainable development and value creation. Uses a proof-of-value mechanism that weights validator votes based on real estate market indicators and sustainable construction metrics.";
      case 'trans':
        return "Consensus for the renewable energy sector focusing on efficiency and sustainability. Implements a proof-of-efficiency consensus that prioritizes energy-efficient operations and carbon offset metrics.";
      case 'ad':
        return "Consensus for the sustainable agriculture sector focusing on ecological balance and food security. Implements a proof-of-sustainability consensus that measures ecological footprint and sustainable farming practices.";
      case 'com':
        return "Consensus for the health technology sector focusing on healthcare outcomes and accessibility. Implements a proof-of-benefit consensus that evaluates healthcare outcomes and accessibility metrics.";
      default:
        return "";
    }
  };
  
  // Helper to get description for each smart contract
  const getContractDescription = (name: string) => {
    switch(name) {
      case 'build':
        return "Smart contract for the real estate sector that manages allocation and validation for real estate investments. Features adaptive algorithms for property markets and sustainable construction.";
      case 'trans':
        return "Smart contract for the renewable energy sector that manages allocation and validation for energy investments. Includes market-responsive parameters for energy source evaluation.";
      case 'ad':
        return "Smart contract for the sustainable agriculture sector that manages allocation and validation for agricultural investments. Adapts to food security conditions and farming methods.";
      case 'com':
        return "Smart contract for the health technology sector that manages allocation and validation for healthcare technology investments. Incorporates clinical evidence requirements and accessibility metrics.";
      default:
        return "";
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">
          VueCoin Consensus Mechanisms & Smart Contracts
        </h1>
        
        <p className="text-lg text-center max-w-3xl mx-auto mb-12">
          VueCoin utilizes specialized consensus mechanisms and smart contracts for each of its four economic pillars, 
          ensuring optimal resource allocation and decision-making tailored to each sector's unique requirements.
        </p>
        
        <Tabs defaultValue="build" className="mb-12" onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="build">BuildSmart</TabsTrigger>
            <TabsTrigger value="trans">TransSmart</TabsTrigger>
            <TabsTrigger value="ad">AdSmart</TabsTrigger>
            <TabsTrigger value="com">ComSmart</TabsTrigger>
          </TabsList>
          
          <TabsContent value="build">
            <ConsensusTab 
              name={buildConsensus.getName()}
              description={getConsensusDescription('build')} 
              efficiencyScore={buildConsensus.getEfficiencyScore()}
              sustainabilityScore={buildConsensus.getSustainabilityScore()}
              adaptabilityScore={buildConsensus.getAdaptabilityScore()}
              contractDescription={getContractDescription('build')}
              key="build"
              color="bg-blue-100"
              icon="🏢"
            />
          </TabsContent>
          
          <TabsContent value="trans">
            <ConsensusTab 
              name={transConsensus.getName()}
              description={getConsensusDescription('trans')} 
              efficiencyScore={transConsensus.getEfficiencyScore()}
              sustainabilityScore={transConsensus.getSustainabilityScore()}
              adaptabilityScore={transConsensus.getAdaptabilityScore()}
              contractDescription={getContractDescription('trans')}
              key="trans"
              color="bg-green-100"
              icon="⚡"
            />
          </TabsContent>
          
          <TabsContent value="ad">
            <ConsensusTab 
              name={adConsensus.getName()}
              description={getConsensusDescription('ad')} 
              efficiencyScore={adConsensus.getEfficiencyScore()}
              sustainabilityScore={adConsensus.getSustainabilityScore()}
              adaptabilityScore={adConsensus.getAdaptabilityScore()}
              contractDescription={getContractDescription('ad')}
              key="ad"
              color="bg-yellow-100"
              icon="🌾"
            />
          </TabsContent>
          
          <TabsContent value="com">
            <ConsensusTab 
              name={comConsensus.getName()}
              description={getConsensusDescription('com')} 
              efficiencyScore={comConsensus.getEfficiencyScore()}
              sustainabilityScore={comConsensus.getSustainabilityScore()}
              adaptabilityScore={comConsensus.getAdaptabilityScore()}
              contractDescription={getContractDescription('com')}
              key="com"
              color="bg-purple-100"
              icon="🩺"
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

interface ConsensusTabProps {
  name: string;
  description: string;
  efficiencyScore: number;
  sustainabilityScore: number;
  adaptabilityScore: number;
  contractDescription: string;
  color: string;
  icon: string;
}

const ConsensusTab: React.FC<ConsensusTabProps> = ({
  name,
  description,
  efficiencyScore,
  sustainabilityScore,
  adaptabilityScore,
  contractDescription,
  color,
  icon
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className={`${color} rounded-t-lg`}>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span> {name} Consensus
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-6">{description}</p>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Efficiency</span>
                <span className="text-sm font-medium">{Math.round(efficiencyScore * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.round(efficiencyScore * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Sustainability</span>
                <span className="text-sm font-medium">{Math.round(sustainabilityScore * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.round(sustainabilityScore * 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Adaptability</span>
                <span className="text-sm font-medium">{Math.round(adaptabilityScore * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.round(adaptabilityScore * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Dynamic parameter adjustment based on market conditions</li>
              <li>Sector-specific validation rules</li>
              <li>Adaptive resource allocation algorithms</li>
              <li>Sustainability and efficiency metrics</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className={`${color} rounded-t-lg`}>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span> {name.replace('Consensus', 'Smart')} Contract
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-6">{contractDescription}</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Adaptive Allocation:</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Development Fund</span>
                    <span className="text-sm font-medium">40-50%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Stability Reserve</span>
                    <span className="text-sm font-medium">15-20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Stakeholder Rewards</span>
                    <span className="text-sm font-medium">10-15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Community Initiatives</span>
                    <span className="text-sm font-medium">15-25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Market Responsiveness:</h3>
              <p>
                The smart contract automatically adjusts parameters based on real-time market data,
                ensuring optimal resource allocation during varying market conditions.
              </p>
              <div className="mt-3 text-sm text-muted-foreground">
                <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 mr-2">Bull Market</span>
                <span className="inline-block px-2 py-1 rounded bg-red-100 text-red-800 mr-2">Bear Market</span>
                <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-800">Market Volatility</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VueConsensusPage;
