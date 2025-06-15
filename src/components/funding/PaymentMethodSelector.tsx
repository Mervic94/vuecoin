
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getPaymentMethodIcon } from "@/utils/paymentIcons";

interface PaymentMethod {
  id: string;
  name: string;
  code: string;
  [key: string]: any;
}

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[];
  selectedMethod: string;
  onSelect: (id: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethods,
  selectedMethod,
  onSelect,
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">Méthode de paiement</label>
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {paymentMethods?.map((method) => (
        <Button
          key={method.id}
          type="button"
          variant={selectedMethod === method.id ? "default" : "outline"}
          onClick={() => onSelect(method.id)}
          className={cn(
            "flex items-center gap-2 h-auto py-3 transition-colors duration-200",
            selectedMethod === method.id
              ? "border-2 border-primary"
              : "hover:bg-[#f1c40f]/10 hover:text-foreground hover:border-[#f1c40f]/50"
          )}
        >
          <span className="flex items-center justify-center w-6 h-6">
            {getPaymentMethodIcon(method)}
          </span>
          <span>{method.name}</span>
        </Button>
      ))}
    </div>
  </div>
);

export default PaymentMethodSelector;
