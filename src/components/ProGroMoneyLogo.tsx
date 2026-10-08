import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const ProGroMoneyLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true 
}) => {
  const badgeDimensions = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }[size];

  const brandTextSize = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Circular ProGro Money Emblem */}
      <div 
        className={`${badgeDimensions} shrink-0 rounded-full shadow-sm hover:shadow-md transition-shadow flex items-center justify-center overflow-hidden bg-white ring-1 ring-slate-200/80`}
        aria-label="ProGro Money Official Emblem"
      >
        <img 
          src="/progro-money-logo.svg" 
          alt="ProGro Money Logo" 
          className="w-full h-full object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline gap-1">
            <span className={`font-display font-extrabold tracking-tight text-[#002169] ${brandTextSize}`}>
              ProGro
            </span>
            <span className={`font-display font-extrabold tracking-tight text-[#08a04b] ${brandTextSize}`}>
              Money
            </span>
          </div>
          <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Loan Channel Partner
          </span>
        </div>
      )}
    </div>
  );
};
