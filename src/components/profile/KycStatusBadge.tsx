
import React from 'react';

interface KycStatusBadgeProps {
  status: string | null;
}

const statusMap: Record<string, {label: string; className: string}> = {
  approved: { label: 'Validé', className: 'bg-green-200 text-green-800' },
  refused:  { label: 'Refusé', className: 'bg-red-200 text-red-800' },
  pending:  { label: 'En attente', className: 'bg-yellow-100 text-yellow-700' },
};

export const KycStatusBadge: React.FC<KycStatusBadgeProps> = ({ status }) => {
  const s = status?.toLowerCase() ?? "pending";
  const { label, className } = statusMap[s] || statusMap.pending;
  return (
    <span className={`ml-2 px-2 py-1 rounded transition-all duration-300 ${className}`}>
      {label}
    </span>
  );
};
