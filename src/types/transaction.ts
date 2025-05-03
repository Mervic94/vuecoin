
export interface Transaction {
  id: string;
  created_at: string;
  amount: number;
  currency: string;
  type: 'deposit' | 'withdrawal' | 'exchange';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  payment_methods: {
    name: string;
    code: string;
  };
}
