
import React from "react";
import { Button } from "@/components/ui/button";

interface DepositSubmitButtonProps {
  disabled: boolean;
}

const DepositSubmitButton: React.FC<DepositSubmitButtonProps> = ({ disabled }) => (
  <Button
    type="submit"
    className="w-full transition-colors duration-200 hover:bg-[#f1c40f]"
    disabled={disabled}
  >
    Déposer
  </Button>
);

export default DepositSubmitButton;
