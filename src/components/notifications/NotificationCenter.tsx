
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Settings, Check, X, AlertTriangle, Info, TrendingUp } from 'lucide-react';

interface Notification {
  id: string;
  type: 'price' | 'security' | 'trade' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'price',
    title: 'Alerte de prix VueCoin',
    message: 'VueCoin a atteint votre prix cible de $2.50',
    timestamp: '2024-06-19 15:30',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'trade',
    title: 'Ordre exécuté',
    message: 'Votre ordre d\'achat de 100 VC a été exécuté',
    timestamp: '2024-06-19 14:45',
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'security',
    title: 'Nouvelle connexion',
    message: 'Connexion détectée depuis Paris, France',
    timestamp: '2024-06-19 12:20',
    read: true,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'system',
    title: 'Maintenance programmée',
    message: 'Maintenance système prévue le 20/06 à 2h00',
    timestamp: '2024-06-19 10:00',
    read: true,
    priority: 'low'
  }
];

const NotificationCenter = () => {
  const [notificationList, setNotificationList] = useState(notifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'price':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'security':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'trade':
        return <Check className="h-4 w-4 text-blue-600" />;
      case 'system':
        return <Info className="h-4 w-4 text-gray-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string, read: boolean) => {
    if (read) return 'border-gray-200';
    switch (priority) {
      case 'high': return 'border-red-300 bg-red-50';
      case 'medium': return 'border-yellow-300 bg-yellow-50';
      case 'low': return 'border-blue-300 bg-blue-50';
      default: return 'border-gray-300';
    }
  };

  const filterNotifications = (type?: string) => {
    if (!type) return notificationList;
    return notificationList.filter(n => n.type === type);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 md:w-96 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Tout marquer lu
                  </Button>
                )}
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mx-4 mb-4">
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="price">Prix</TabsTrigger>
                <TabsTrigger value="trade">Trading</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
              </TabsList>

              <div className="max-h-96 overflow-y-auto">
                <TabsContent value="all" className="m-0">
                  <div className="space-y-1">
                    {filterNotifications().map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-l-4 hover:bg-muted/50 transition-colors cursor-pointer ${getPriorityColor(notification.priority, notification.read)}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {getNotificationIcon(notification.type)}
                            <div className="min-w-0 flex-1">
                              <p className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                                {notification.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.timestamp}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="price" className="m-0">
                  <div className="space-y-1">
                    {filterNotifications('price').map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-l-4 hover:bg-muted/50 transition-colors cursor-pointer ${getPriorityColor(notification.priority, notification.read)}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="trade" className="m-0">
                  <div className="space-y-1">
                    {filterNotifications('trade').map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-l-4 hover:bg-muted/50 transition-colors cursor-pointer ${getPriorityColor(notification.priority, notification.read)}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="security" className="m-0">
                  <div className="space-y-1">
                    {filterNotifications('security').map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-l-4 hover:bg-muted/50 transition-colors cursor-pointer ${getPriorityColor(notification.priority, notification.read)}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            {notificationList.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Aucune notification</p>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
