
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PerformanceWidgets from './PerformanceWidgets';
import RecentActivity from './RecentActivity';
import SecurityAlerts from './SecurityAlerts';
import TradingOverview from './TradingOverview';
import NotificationCenter from '../notifications/NotificationCenter';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header avec notifications */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">Bienvenue sur votre espace VueCoin</p>
        </div>
        <NotificationCenter />
      </div>

      {/* Widgets de performance */}
      <PerformanceWidgets />

      {/* Contenu principal avec onglets */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="activity">Activité</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <RecentActivity />
            <SecurityAlerts />
          </div>
        </TabsContent>

        <TabsContent value="trading">
          <TradingOverview />
        </TabsContent>

        <TabsContent value="security">
          <SecurityAlerts detailed />
        </TabsContent>

        <TabsContent value="activity">
          <RecentActivity detailed />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
