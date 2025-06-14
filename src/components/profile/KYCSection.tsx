
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const KYCSection = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [kycStatus, setKycStatus] = useState<string | null>(null);

  // Charger le statut KYC existant
  React.useEffect(() => {
    const fetchStatus = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('kyc_status')
          .eq('id', user.id)
          .maybeSingle();
        if (data) setKycStatus(data.kyc_status);
      }
    };
    fetchStatus();
  }, [user]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file || !user) return;

      // 1. Upload du fichier dans le bucket "kyc"
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('kyc')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Mise à jour du profil côté Supabase
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          kyc_documents: [{ name: file.name, path: filePath, uploaded_at: new Date().toISOString() }],
          kyc_status: 'pending',
          kyc_status_log: [
            { status: 'pending', at: new Date().toISOString(), by: 'user', reason: 'Nouveau document soumis' }
          ],
        })
        .eq('id', user.id);

      if (updateError) throw updateError;
      setKycStatus('pending');

      toast({
        title: "Document téléchargé",
        description: "Votre document a été envoyé pour vérification. Statut : en attente."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de télécharger le document: " + error?.message
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vérification KYC</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="font-bold">Statut KYC :</span>
            <span className={`ml-2 px-2 py-1 rounded 
              ${kycStatus === 'approved' ? 'bg-green-200 text-green-800' : 
                kycStatus === 'refused' ? 'bg-red-200 text-red-800' : 
                'bg-yellow-100 text-yellow-700'}`}>
              {kycStatus === 'approved' ? 'Validé' :
                kycStatus === 'refused' ? 'Refusé' :
                'En attente'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Pour effectuer des transactions, vous devez vérifier votre identité en téléchargeant une pièce d'identité valide.
          </p>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez et déposez
                </p>
                <p className="text-xs text-gray-500">Format accepté : PNG, JPG, PDF (max. 10MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KYCSection;
