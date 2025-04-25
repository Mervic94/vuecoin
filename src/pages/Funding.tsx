
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DepositForm from '@/components/funding/DepositForm';
import WithdrawForm from '@/components/funding/WithdrawForm';

const Funding = () => {
  return (
    <div className="container mx-auto px-4 py-8">
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
  );
};

export default Funding;
