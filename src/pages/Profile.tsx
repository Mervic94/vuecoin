
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import KYCSection from '@/components/profile/KYCSection';
import ProfileForm from '@/components/profile/ProfileForm';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        <ProfileForm />
        <KYCSection />
      </div>
    </div>
  );
};

export default Profile;
