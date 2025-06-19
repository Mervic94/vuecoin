
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft, Shield, CreditCard, Bell } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'trade' | 'deposit' | 'withdrawal' | 'security' | 'notification';
  title: string;
  description: string;
  amount?: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

const recentActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'trade',
    title: 'Achat VueCoin',
    description: 'Ordre d\'achat exécuté',
    amount: 500,
    timestamp: '2024-06-19 14:30',
    status: 'completed'
  },
  {
    id: '2',
    type: 'deposit',
    title: 'Dépôt PayPal',
    description: 'Fonds ajoutés au portefeuille',
    amount: 1000,
    timestamp: '2024-06-19 12:15',
    status: 'completed'
  },
  {
    id: '3',
    type: 'security',
    title: 'Connexion détectée',
    description: 'Nouvelle connexion depuis Paris',
    timestamp: '2024-06-19 10:45',
    status: 'completed'
  },
  {
    id: '4',
    type: 'trade',
    title: 'Vente Bitcoin',
    description: 'Ordre de vente en attente',
    amount: 250,
    timestamp: '2024-06-19 09:20',
    status: 'pending'
  },
  {
    id: '5',
    type: 'notification',
    title: 'Alerte de prix',
    description: 'VueCoin a atteint votre prix cible',
    timestamp: '2024-06-19 08:00',
    status: 'completed'
  }
];

interface RecentActivityProps {
  detailed?: boolean;
}

const RecentActivity = ({ detailed = false }: RecentActivityProps) => {
  const displayActivities = detailed ? recentActivities : recentActivities.slice(0, 5);

  const getIcon = (type: string) => {
    switch (type) {
      case 'trade':
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case 'security':
        return <Shield className="h-4 w-4 text-orange-600" />;
      case 'notification':
        return <Bell className="h-4 w-4 text-purple-600" />;
      default:
        return <CreditCard className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Terminé</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En attente</Badge>;
      case 'failed':
        return <Badge variant="destructive">Échoué</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Activité Récente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0 mt-1">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  {getStatusBadge(activity.status)}
                </div>
                <p className="text-xs text-muted-foreground mb-1">{activity.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  {activity.amount && (
                    <span className={`text-sm font-medium ${
                      activity.type === 'deposit' ? 'text-green-600' : 
                      activity.type === 'withdrawal' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {activity.type === 'deposit' ? '+' : activity.type === 'withdrawal' ? '-' : ''}
                      ${activity.amount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!detailed && (
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Voir toute l'activité
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
