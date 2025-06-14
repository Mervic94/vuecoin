
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KycStatusBadge } from "@/components/profile/KycStatusBadge";
import { KycDocumentList } from "@/components/profile/KycDocumentList";
import { KycStatusLogList } from "@/components/profile/KycStatusLogList";
import { Loader2, Check, X } from "lucide-react";

type KycDoc = {
  name: string;
  path: string;
  uploaded_at: string;
};
type KycLog = {
  status: string;
  at: string;
  by: string;
  reason?: string;
};

type KycProfile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  kyc_status: string;
  kyc_documents: KycDoc[];
  kyc_status_log: KycLog[];
};

export default function KycDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<KycProfile[]>([]);
  const [selected, setSelected] = useState<KycProfile | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Vérifier si l'utilisateur courant est admin
  useEffect(() => {
    const checkRole = async () => {
      setCheckingAdmin(true);
      if (!user) return;
      // Utilise la fonction SQL has_role pour vérifier
      const { data, error } = await supabase
        .rpc("has_role", { _user_id: user.id, _role: "admin" });
      setIsAdmin(!!data);
      setCheckingAdmin(false);
    };
    checkRole();
  }, [user]);

  // Charger les profils KYC à traiter (pending/refused)
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, first_name, last_name, kyc_status, kyc_documents, kyc_status_log")
        .in("kyc_status", ["pending", "refused"]);
      if (!error && data) {
        // Décodage JSON, fallback sécuritaires
        const safeProfiles = data.map((p: any) => ({
          ...p,
          kyc_documents: Array.isArray(p.kyc_documents) ? p.kyc_documents : [],
          kyc_status_log: Array.isArray(p.kyc_status_log) ? p.kyc_status_log : [],
        }));
        setProfiles(safeProfiles);
      }
      setLoading(false);
    };
    if (isAdmin) fetchProfiles();
  }, [isAdmin]);

  // Action admin : approuver/refuser
  const handleKycAction = async (status: "approved" | "refused", reason?: string) => {
    if (!selected || !user) return;
    setActionLoading(true);
    try {
      // Ajoute le log de statut
      const now = new Date().toISOString();
      const lastLogs: KycLog[] = Array.isArray(selected.kyc_status_log) ? selected.kyc_status_log : [];
      const newLog: KycLog = {
        status,
        at: now,
        by: "admin:" + user.email,
        reason,
      };
      const { error } = await supabase
        .from("profiles")
        .update({
          kyc_status: status,
          kyc_status_log: [...lastLogs, newLog],
        })
        .eq("id", selected.id);

      if (error) throw error;
      toast({
        title: `KYC ${status === "approved" ? "validé" : "refusé"}`,
        description: `Le statut KYC de l'utilisateur a été mis à jour.`,
      });
      setSelected(null);
      // Refresh la liste
      setProfiles((old) =>
        old.map((p) =>
          p.id === selected.id
            ? { ...p, kyc_status: status, kyc_status_log: [...lastLogs, newLog] }
            : p
        )
      );
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: e?.message || "Erreur lors de l'opération.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (checkingAdmin) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-7 w-7" />
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-2 text-center">
        <X className="h-10 w-10 text-red-500" />
        <h2 className="text-lg font-bold">Accès refusé</h2>
        <div>Vous n'avez pas les droits administrateur pour accéder à cette page.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Gestion des demandes KYC</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 flex justify-center"><Loader2 className="animate-spin" /></div>
            ) : (
              <div>
                {!selected ? (
                  <div>
                    {profiles.length === 0 ? (
                      <div className="text-center text-muted-foreground p-8">Aucune demande KYC à traiter.</div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {profiles.map((p) => (
                          <div
                            key={p.id}
                            className="border rounded px-3 py-2 flex flex-col md:flex-row md:items-center md:justify-between hover:bg-accent/30 cursor-pointer"
                            onClick={() => setSelected(p)}
                            tabIndex={0}
                          >
                            <div>
                              <span className="font-semibold">{p.first_name} {p.last_name}</span>{" "}
                              <span className="text-gray-500">{p.email}</span>
                            </div>
                            <div>
                              <KycStatusBadge status={p.kyc_status} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Consultation d'un profil
                  <div>
                    <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>← Retour</Button>
                    <div className="mt-4">
                      <div className="text-xl font-bold">{selected.first_name} {selected.last_name}</div>
                      <div className="text-muted-foreground">{selected.email}</div>
                      <div className="my-2">
                        Statut actuel : <KycStatusBadge status={selected.kyc_status} />
                      </div>
                      <KycDocumentList kycDocs={selected.kyc_documents} />
                      <KycStatusLogList logs={selected.kyc_status_log} />
                      <div className="flex gap-2 mt-4">
                        <Button
                          disabled={actionLoading}
                          onClick={() => handleKycAction("approved")}
                          className="bg-green-500 text-white hover:bg-green-600"
                        >
                          <Check className="mr-2 h-4 w-4" /> Valider
                        </Button>
                        <RefuseDialog
                          disabled={actionLoading}
                          onRefuse={(reason) => handleKycAction("refused", reason)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Composant popup refus avec champ raison
function RefuseDialog({
  onRefuse,
  disabled,
}: {
  onRefuse: (reason?: string) => void;
  disabled?: boolean;
}) {
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState("");
  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setShow(true)}
        className="bg-red-500 hover:bg-red-600 text-white"
        disabled={disabled}
      >
        <X className="mr-2 h-4 w-4" /> Refuser
      </Button>
      {show && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-xs">
            <div className="font-bold text-lg mb-2">Raison du refus (facultatif)</div>
            <input
              type="text"
              className="border rounded px-2 py-1 w-full mb-4"
              placeholder="Motif (facultatif)"
              value={reason}
              autoFocus
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="outline" onClick={() => setShow(false)}>
                Annuler
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  onRefuse(reason);
                  setShow(false);
                  setReason("");
                }}
                className="bg-red-500 hover:bg-red-600 text-white"
                disabled={disabled}
              >
                Refuser
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
