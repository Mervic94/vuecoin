
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload } from 'lucide-react';

const KYCSection = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      // Upload logic will be implemented later
      toast({
        title: "Document téléchargé",
        description: "Votre document a été envoyé pour vérification."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de télécharger le document: " + error.message
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
