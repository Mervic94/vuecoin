
import React from 'react';
import { File as FileIcon } from 'lucide-react';

export interface KycDoc {
  name: string;
  path: string;
  uploaded_at: string;
}

interface KycDocumentListProps {
  kycDocs: KycDoc[];
}

export const KycDocumentList: React.FC<KycDocumentListProps> = ({ kycDocs }) => {
  if (!kycDocs.length) return null;
  return (
    <div className="mt-2">
      <div className="font-semibold mb-1">Documents envoyés :</div>
      <div className="flex flex-col gap-1">
        {kycDocs.map((doc, idx) => (
          <div key={doc.path || idx} className="flex items-center gap-2 text-xs bg-muted px-2 py-1 rounded">
            <FileIcon className="h-4 w-4 text-primary" />
            <span className="truncate">{doc.name}</span>
            <span className="text-gray-500">({new Date(doc.uploaded_at).toLocaleDateString()})</span>
          </div>
        ))}
      </div>
    </div>
  );
};
