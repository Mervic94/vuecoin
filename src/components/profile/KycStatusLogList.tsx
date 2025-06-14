
import React from 'react';

export interface KycLog {
  status: string;
  at: string;
  by: string;
  reason?: string;
}

const statusColor = (status: string) =>
  status === 'approved'
    ? 'bg-green-200 text-green-800'
    : status === 'refused'
    ? 'bg-red-200 text-red-800'
    : 'bg-yellow-100 text-yellow-700';

interface KycStatusLogListProps {
  logs: KycLog[];
}

export const KycStatusLogList: React.FC<KycStatusLogListProps> = ({ logs }) => {
  if (!logs.length) return null;
  return (
    <div className="mt-3">
      <div className="font-semibold text-sm mb-1">Historique des statuts :</div>
      <ul className="flex flex-col gap-1 text-xs">
        {[...logs].reverse().map((log, idx) => (
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
  );
};
