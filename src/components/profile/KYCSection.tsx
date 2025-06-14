
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { KycStatusBadge } from './KycStatusBadge';
import { KycUploadArea } from './KycUploadArea';
import { KycDocumentList, KycDoc } from './KycDocumentList';
import { KycStatusLogList, KycLog } from './KycStatusLogList';

// SUPPRESSION des déclarations locales conflictuelles :
// interface KycDoc { ... }
// interface KycLog { ... }

const isKycDocArray = (value: unknown): value is KycDoc[] =>
  Array.isArray(value) &&
  value.every(
    (v) =>
      v &&
      typeof v === "object" &&
      typeof (v as any).name === "string" &&
      typeof (v as any).path === "string" &&
      typeof (v as any).uploaded_at === "string"
  );

const isKycLogArray = (value: unknown): value is KycLog[] =>
  Array.isArray(value) &&
  value.every(
    (v) =>
      v &&
      typeof v === "object" &&
      typeof (v as any).status === "string" &&
      typeof (v as any).at === "string" &&
      typeof (v as any).by === "string"
  );

const KYCSection = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [kycStatus, setKycStatus] = useState<string | null>(null);
  const [kycDocs, setKycDocs] = useState<KycDoc[]>([]);
  const [kycLog, setKycLog] = useState<KycLog[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchStatus = async () => {
      setLoadError(null);
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('kyc_status, kyc_documents, kyc_status_log')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          setLoadError("Erreur lors de la récupération du profil : " + error.message);
          return;
        }
        if (!data) {
          setLoadError("Profil inexistant ou informations de KYC manquantes.");
          return;
        }

        setKycStatus(data.kyc_status || 'pending');

        // Safely decode possible values
        let docs: KycDoc[] = [];
        if (isKycDocArray(data.kyc_documents)) {
          docs = data.kyc_documents;
        }
        setKycDocs(docs);

        let logs: KycLog[] = [];
        if (isKycLogArray(data.kyc_status_log)) {
          logs = data.kyc_status_log;
        }
        setKycLog(logs);
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
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2. Récupération des anciens docs/logs
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('kyc_documents, kyc_status_log')
        .eq('id', user.id)
        .maybeSingle();

      if (fetchError || !profile) throw new Error("Erreur de lecture profil après upload.");

      let oldDocs: KycDoc[] = [];
      let oldLogs: KycLog[] = [];
      if (isKycDocArray(profile.kyc_documents)) oldDocs = profile.kyc_documents;
      if (isKycLogArray(profile.kyc_status_log)) oldLogs = profile.kyc_status_log;

      const now = new Date().toISOString();

      // 3. Ajout du nouveau document
      const newDoc: KycDoc = { name: file.name, path: filePath, uploaded_at: now };
      const newDocs: KycDoc[] = [...oldDocs, newDoc];
      const newLog: KycLog = { status: 'pending', at: now, by: 'user', reason: 'Document soumis' };
      const newLogs: KycLog[] = [...oldLogs, newLog];

      const safeDocs = newDocs.map(d => ({ ...d }));
      const safeLogs = newLogs.map(l => ({ ...l }));

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          kyc_documents: safeDocs,
          kyc_status: 'pending',
          kyc_status_log: safeLogs,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setKycStatus('pending');
      setKycDocs(safeDocs);
      setKycLog(safeLogs);

      toast({
        title: "Document téléchargé",
        description:
          "Votre document a été envoyé pour vérification. Statut : en attente.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de télécharger le document : " + error?.message,
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
          {loadError && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2">{loadError}</div>
          )}
          <div>
            <span className="font-bold">Statut KYC :</span>
            <KycStatusBadge status={kycStatus} />
          </div>
          <p className="text-sm text-gray-600">
            Pour effectuer des transactions, vous devez vérifier votre identité en téléchargeant une pièce d'identité valide.
          </p>

          <KycUploadArea onFileUpload={handleFileUpload} uploading={uploading} />

          <KycDocumentList kycDocs={kycDocs} />

          <KycStatusLogList logs={kycLog} />
        </div>
      </CardContent>
    </Card>
  );
};

export default KYCSection;

