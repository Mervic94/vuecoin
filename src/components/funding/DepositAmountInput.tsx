
import React from "react";
import { Input } from "@/components/ui/input";

interface DepositAmountInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DepositAmountInput: React.FC<DepositAmountInputProps> = ({ value, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">Montant</label>
    <Input
      type="number"
      min="0"
      step="0.01"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Montant à déposer"
      required
      className="transition-colors duration-200 focus:border-[#f1c40f] focus:ring-[#f1c40f]"
    />
  </div>
);

export default DepositAmountInput;
