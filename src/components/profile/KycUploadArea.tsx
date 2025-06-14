
import React from 'react';
import { Loader2, Upload } from 'lucide-react';

interface KycUploadAreaProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}

export const KycUploadArea: React.FC<KycUploadAreaProps> = ({ onFileUpload, uploading }) => (
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
        onChange={onFileUpload}
        disabled={uploading}
      />
    </label>
  </div>
);
