
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';

type ProfileFormData = {
  first_name: string;
  last_name: string;
};

const ProfileForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>();

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le profil: " + error.message
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              Prénom
            </label>
            <input
              {...register("first_name")}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              {...register("last_name")}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <Button type="submit">Mettre à jour</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
