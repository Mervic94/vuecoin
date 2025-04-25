
import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/lovable-uploads/f14ac3df-4827-42eb-8071-0f5d18bbee9d.png" 
        alt="VueCoin Logo" 
        className="h-8 w-8"
      />
      <span className="font-bold text-xl">VueCoin</span>
    </div>
  );
};

export default Logo;
