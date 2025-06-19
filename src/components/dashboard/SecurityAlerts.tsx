
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, XCircle, MapPin, Clock, Smartphone } from 'lucide-react';

interface SecurityAlert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'danger';
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  device?: string;
  action?: string;
  resolved?: boolean;
}

const securityAlerts: SecurityAlert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Nouvelle connexion détectée',
    description: 'Connexion depuis un nouvel appareil',
    timestamp: '2024-06-19 14:30',
    location: 'Paris, France',
    device: 'Chrome sur Windows',
    action: 'Vérifier'
  },
  {
    id: '2',
    type: 'success',
    title: '2FA activé avec succès',
    description: 'Authentification à deux facteurs configurée',
    timestamp: '2024-06-19 12:00',
    resolved: true
  },
  {
    id: '3',
    type: 'info',
    title: 'KYC en cours de vérification',
    description: 'Documents soumis pour validation',
    timestamp: '2024-06-19 10:15',
    action: 'Suivre'
  },
  {
    id: '4',
    type: 'danger',
    title: 'Tentative de connexion échouée',
    description: '3 tentatives depuis une IP suspecte',
    timestamp: '2024-06-18 22:45',
    location: 'Localisation inconnue',
    action: 'Bloquer IP'
  }
];

interface SecurityAlertsProps {
  detailed?: boolean;
}

const SecurityAlerts = ({ detailed = false }: SecurityAlertsProps) => {
  const [alerts, setAlerts] = useState(securityAlerts);
  
  const displayAlerts = detailed ? alerts : alerts.slice(0, 3);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info':
        return <Shield className="h-4 w-4 text-blue-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'danger':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Attention</Badge>;
      case 'info':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Info</Badge>;
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Succès</Badge>;
      case 'danger':
        return <Badge variant="destructive">Critique</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Alertes de Sécurité
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayAlerts.map((alert) => (
            <Alert key={alert.id} className={`${alert.resolved ? 'opacity-60' : ''}`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">{alert.title}</h4>
                    {getAlertBadge(alert.type)}
                  </div>
                  <AlertDescription className="text-xs mb-2">
                    {alert.description}
                  </AlertDescription>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.timestamp}
                    </div>
                    {alert.location && (
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {alert.location}
                      </div>
                    )}
                    {alert.device && (
                      <div className="flex items-center">
                        <Smartphone className="h-3 w-3 mr-1" />
                        {alert.device}
                      </div>
                    )}
                  </div>
                  
                  {alert.action && !alert.resolved && (
                    <div className="flex space-x-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleResolveAlert(alert.id)}
                        className="text-xs"
                      >
                        {alert.action}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleResolveAlert(alert.id)}
                        className="text-xs"
                      >
                        Ignorer
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Alert>
          ))}
        </div>
        
        {!detailed && (
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Voir toutes les alertes
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityAlerts;
