
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, Activity, DollarSign, BarChart3 } from 'lucide-react';

const performanceData = [
  { date: '01/06', portfolio: 2500, profit: 125 },
  { date: '05/06', portfolio: 2650, profit: 275 },
  { date: '10/06', portfolio: 2420, profit: 145 },
  { date: '15/06', portfolio: 2780, profit: 405 },
  { date: '20/06', portfolio: 2900, profit: 525 },
];

const portfolioDistribution = [
  { name: 'VueCoin', value: 45, color: '#3b82f6' },
  { name: 'Bitcoin', value: 25, color: '#f59e0b' },
  { name: 'Ethereum', value: 20, color: '#8b5cf6' },
  { name: 'Solana', value: 10, color: '#10b981' },
];

const PerformanceWidgets = () => {
  const [totalBalance, setTotalBalance] = useState(2900);
  const [dailyChange, setDailyChange] = useState(+125);
  const [activeOrders, setActiveOrders] = useState(5);

  const changePercent = (dailyChange / totalBalance) * 100;
  const isPositive = dailyChange >= 0;

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* Widget Solde Total */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Solde Total</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalBalance.toLocaleString()}</div>
          <div className={`flex items-center text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {isPositive ? '+' : ''}{dailyChange} ({changePercent.toFixed(2)}%)
          </div>
        </CardContent>
      </Card>

      {/* Widget Performance */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Performance 7j</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">+12.5%</div>
          <div className="h-16 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Widget Ordres Actifs */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ordres Actifs</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeOrders}</div>
          <p className="text-xs text-muted-foreground">3 achats, 2 ventes</p>
        </CardContent>
      </Card>

      {/* Widget Revenus */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenus Mensuels</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$525</div>
          <p className="text-xs text-green-600">+18% ce mois</p>
        </CardContent>
      </Card>

      {/* Graphique de performance étendu */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-3 hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>Évolution du Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="portfolio" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Distribution du portfolio */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>Répartition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] md:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {portfolioDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {portfolioDistribution.map((item) => (
              <div key={item.name} className="flex items-center text-sm">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1">{item.name}</span>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceWidgets;
