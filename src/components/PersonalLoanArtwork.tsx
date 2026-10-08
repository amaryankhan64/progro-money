import React from 'react';

interface ArtworkProps {
  className?: string;
  onApplyClick?: () => void;
}

export const PersonalLoanArtwork: React.FC<ArtworkProps> = ({ className = '', onApplyClick }) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-5 sm:p-6 text-white border border-emerald-500/20 shadow-xl ${className}`}
      aria-label="Personal Loan Highlights"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2 max-w-md">
          <div className="flex items-center gap-2.5">
            <img 
              src="/progro-money-logo.svg" 
              alt="ProGro Money Logo" 
              className="w-10 h-10 rounded-full bg-white p-0.5 shadow-md shrink-0" 
            />
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[11px] font-semibold text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Lowest Indicative Rate
            </div>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            Personal Loans from <span className="text-emerald-400">9.99% p.a.</span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            Fast channel assistance for salaried &amp; self-employed borrowers across bank DSA &amp; NBFC channels.
          </p>

          <div className="flex flex-col gap-1.5 pt-1 text-[11px] text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
              <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Zero Document Uploads on Form
            </span>
            <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
              <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No fee charged by ProGro; lender charges, if any, are disclosed separately
            </span>
          </div>
        </div>

        {/* Quick Indicative Card */}
        <div className="w-full md:w-auto shrink-0 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col gap-3 min-w-[220px]">
          <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
            <span className="text-[11px] text-slate-400">Indicative ROI</span>
            <span className="font-mono font-bold text-emerald-400 text-base">9.99% – 35%</span>
          </div>
          <div className="flex justify-between items-baseline text-[11px]">
            <span className="text-slate-400">Tenure</span>
            <span className="font-medium text-slate-200">12 – 60 Months</span>
          </div>
          {onApplyClick && (
            <button
              type="button"
              onClick={onApplyClick}
              className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md active:scale-95 text-center mt-1"
            >
              Start Enquiry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
