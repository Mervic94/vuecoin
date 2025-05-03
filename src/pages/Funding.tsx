
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DepositForm from '@/components/funding/DepositForm';
import WithdrawForm from '@/components/funding/WithdrawForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Funding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Dépôt</CardTitle>
            </CardHeader>
            <CardContent>
              <DepositForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Retrait</CardTitle>
            </CardHeader>
            <CardContent>
              <WithdrawForm />
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Funding;
