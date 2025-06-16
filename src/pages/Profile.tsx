
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import KYCSection from '@/components/profile/KYCSection';
import EnhancedProfileForm from '@/components/profile/EnhancedProfileForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="grid gap-6">
          <EnhancedProfileForm />
          <KYCSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
