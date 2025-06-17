
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, Award, Globe } from 'lucide-react';
import { partnerStats } from '@/data/testimonials';

const TestimonialStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Partenaires actifs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-2xl font-bold">{partnerStats.totalPartners}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Volume total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
            <span className="text-2xl font-bold">{partnerStats.totalTransactionVolume}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Réduction moyenne
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Award className="w-6 h-6 text-orange-600 mr-2" />
            <span className="text-2xl font-bold">{partnerStats.averageCostReduction}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Satisfaction moyenne
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Globe className="w-6 h-6 text-purple-600 mr-2" />
            <span className="text-2xl font-bold">{partnerStats.averageSatisfactionScore}/5</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialStats;
