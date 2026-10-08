import React, { useState, useMemo } from 'react';

export const IndicativeEmiEstimator: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [roi, setRoi] = useState<number>(12.0);
  const [tenureYears, setTenureYears] = useState<number>(3);

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyEmi = useMemo(() => {
    const P = loanAmount;
    const r = roi / (12 * 100);
    const n = tenureYears * 12;

    if (r === 0) return Math.round(P / n);

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  }, [loanAmount, roi, tenureYears]);

  // Format currency in Indian standard
  const formatINR = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  return (
    <section 
      aria-labelledby="emi-estimator-heading"
      className={`bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 id="emi-estimator-heading" className="font-display text-base sm:text-lg font-bold text-slate-900">
          Indicative EMI Estimator
        </h2>
        <span className="text-[10px] sm:text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded">
          Informational Tool
        </span>
      </div>

      <div className="space-y-4">
        {/* Slider 1: Loan Amount */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-baseline text-xs">
            <label htmlFor="emi-loan-amount" className="font-semibold text-slate-700">
              Loan Amount:
            </label>
            <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
              {formatINR(loanAmount)}
            </span>
          </div>
          <input
            id="emi-loan-amount"
            type="range"
            min={50000}
            max={5000000}
            step={25000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        {/* Slider 2: Indicative ROI */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-baseline text-xs">
            <label htmlFor="emi-roi" className="font-semibold text-slate-700">
              Indicative ROI:
            </label>
            <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
              {roi.toFixed(2)}% p.a.
            </span>
          </div>
          <input
            id="emi-roi"
            type="range"
            min={9.0}
            max={35.0}
            step={0.25}
            value={roi}
            onChange={(e) => setRoi(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        {/* Slider 3: Tenure */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-baseline text-xs">
            <label htmlFor="emi-tenure" className="font-semibold text-slate-700">
              Tenure:
            </label>
            <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
              {tenureYears} {tenureYears === 1 ? 'Year' : 'Years'} ({tenureYears * 12} mos)
            </span>
          </div>
          <input
            id="emi-tenure"
            type="range"
            min={1}
            max={30}
            step={1}
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>
      </div>

      {/* Result Display Box */}
      <div className="pt-1">
        <div className="bg-emerald-50/50 rounded-xl border border-emerald-200/80 p-3.5 sm:p-4 flex items-center justify-between">
          <span className="text-xs sm:text-sm text-slate-700 font-medium">
            Tentative Monthly EMI:
          </span>
          <span className="font-mono font-extrabold text-base sm:text-xl text-emerald-800">
            {formatINR(monthlyEmi)} /mo*
          </span>
        </div>

        {/* Disclaimer Note Underneath */}
        <p className="text-[10px] sm:text-[11px] text-slate-500 italic leading-relaxed mt-2.5">
          *Indicative mathematical computation only. Actual EMI will vary according to the lending institution&apos;s amortization policy, fees, and exact sanction terms.
        </p>
      </div>
    </section>
  );
};
