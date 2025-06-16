
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';

type EnhancedProfileFormData = {
  first_name: string;
  last_name: string;
  phone_number: string;
  address_line1: string;
  address_line2: string;
  city: string;
  postal_code: string;
  country: string;
  date_of_birth: string;
};

const EnhancedProfileForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<EnhancedProfileFormData>();

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!error && data) {
      setValue('first_name', data.first_name || '');
      setValue('last_name', data.last_name || '');
      setValue('phone_number', data.phone_number || '');
      setValue('address_line1', data.address_line1 || '');
      setValue('address_line2', data.address_line2 || '');
      setValue('city', data.city || '');
      setValue('postal_code', data.postal_code || '');
      setValue('country', data.country || '');
      setValue('date_of_birth', data.date_of_birth || '');
    }
  };

  const onSubmit = async (data: EnhancedProfileFormData) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...data,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles complètes</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium mb-1">
                Prénom *
              </label>
              <Input
                {...register("first_name", { required: "Le prénom est requis" })}
                placeholder="Votre prénom"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium mb-1">
                Nom *
              </label>
              <Input
                {...register("last_name", { required: "Le nom est requis" })}
                placeholder="Votre nom"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium mb-1">
                Numéro de téléphone
              </label>
              <Input
                {...register("phone_number")}
                placeholder="+33 6 12 34 56 78"
                type="tel"
              />
            </div>

            <div>
              <label htmlFor="date_of_birth" className="block text-sm font-medium mb-1">
                Date de naissance
              </label>
              <Input
                {...register("date_of_birth")}
                type="date"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address_line1" className="block text-sm font-medium mb-1">
              Adresse ligne 1
            </label>
            <Input
              {...register("address_line1")}
              placeholder="123 rue de la Paix"
            />
          </div>

          <div>
            <label htmlFor="address_line2" className="block text-sm font-medium mb-1">
              Adresse ligne 2 (optionnel)
            </label>
            <Input
              {...register("address_line2")}
              placeholder="Appartement, suite, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">
                Ville
              </label>
              <Input
                {...register("city")}
                placeholder="Paris"
              />
            </div>

            <div>
              <label htmlFor="postal_code" className="block text-sm font-medium mb-1">
                Code postal
              </label>
              <Input
                {...register("postal_code")}
                placeholder="75001"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-1">
                Pays
              </label>
              <Input
                {...register("country")}
                placeholder="France"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Mise à jour..." : "Mettre à jour"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedProfileForm;
