
import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-white font-bold">
        V
      </div>
      <span className="font-bold text-xl">VueCoin</span>
    </div>
  );
};

export default Logo;
