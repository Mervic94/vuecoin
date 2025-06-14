
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Loader2, File as FileIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface KycDoc {
  name: string;
  path: string;
  uploaded_at: string;
}

interface KycLog {
  status: string;
  at: string;
  by: string;
  reason?: string;
}

const KYCSection = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [kycStatus, setKycStatus] = useState<string | null>(null);
  const [kycDocs, setKycDocs] = useState<KycDoc[]>([]);
  const [kycLog, setKycLog] = useState<KycLog[]>([]);

  // Charger infos KYC existantes
  React.useEffect(() => {
    const fetchStatus = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('kyc_status, kyc_documents, kyc_status_log')
          .eq('id', user.id)
          .maybeSingle();
        if (data) {
          setKycStatus(data.kyc_status || 'pending');
          setKycDocs(Array.isArray(data.kyc_documents) ? data.kyc_documents : []);
          setKycLog(Array.isArray(data.kyc_status_log) ? data.kyc_status_log : []);
        }
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
      const { data: profile } = await supabase
        .from('profiles')
        .select('kyc_documents, kyc_status_log')
        .eq('id', user.id)
        .maybeSingle();

      const documents: KycDoc[] = Array.isArray(profile?.kyc_documents) ? profile.kyc_documents : [];
      const logs: KycLog[] = Array.isArray(profile?.kyc_status_log) ? profile.kyc_status_log : [];

      const now = new Date().toISOString();

      // 3. Ajout du nouveau document
      const newDoc: KycDoc = { name: file.name, path: filePath, uploaded_at: now };
      const newDocs = [...documents, newDoc];
      const newLog: KycLog = { status: 'pending', at: now, by: 'user', reason: 'Document soumis' };
      const newLogs = [...logs, newLog];

      // 4. Mise à jour du profil
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          kyc_documents: newDocs,
          kyc_status: 'pending',
          kyc_status_log: newLogs,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setKycStatus('pending');
      setKycDocs(newDocs);
      setKycLog(newLogs);

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

  const statusColor = (status: string) =>
    status === 'approved'
      ? 'bg-green-200 text-green-800'
      : status === 'refused'
      ? 'bg-red-200 text-red-800'
      : 'bg-yellow-100 text-yellow-700';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vérification KYC</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="font-bold">Statut KYC :</span>
            <span
              className={`ml-2 px-2 py-1 rounded transition-all duration-300 ${statusColor(
                kycStatus || 'pending'
              )}`}
            >
              {kycStatus === 'approved'
                ? 'Validé'
                : kycStatus === 'refused'
                ? 'Refusé'
                : 'En attente'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Pour effectuer des transactions, vous devez vérifier votre identité en téléchargeant une pièce d'identité valide.
          </p>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 relative">
              {uploading && (
                <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center">
                  <Loader2 className="animate-spin h-10 w-10 text-primary" />
                </div>
              )}
              <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
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

          {/* Liste des documents déjà envoyés */}
          {kycDocs.length > 0 && (
            <div className="mt-2">
              <div className="font-semibold mb-1">Documents envoyés :</div>
              <div className="flex flex-col gap-1">
                {kycDocs.map((doc, idx) => (
                  <div key={doc.path} className="flex items-center gap-2 text-xs bg-muted px-2 py-1 rounded">
                    <FileIcon className="h-4 w-4 text-primary" />
                    <span className="truncate">{doc.name}</span>
                    <span className="text-gray-500">({new Date(doc.uploaded_at).toLocaleDateString()})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Log de statut KYC */}
          {kycLog.length > 0 && (
            <div className="mt-3">
              <div className="font-semibold text-sm mb-1">Historique des statuts :</div>
              <ul className="flex flex-col gap-1 text-xs">
                {kycLog
                  .slice()
                  .reverse()
                  .map((log, idx) => (
                    <li key={idx}>
                      <span className={`${statusColor(log.status)} px-2 py-0.5 rounded font-bold`}>
                        {log.status === 'approved'
                          ? 'Validé'
                          : log.status === 'refused'
                          ? 'Refusé'
                          : 'En attente'}
                      </span>
                      <span className="ml-2">{new Date(log.at).toLocaleString()}</span>
                      {log.reason && <span className="ml-1 text-gray-500">({log.reason})</span>}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KYCSection;

