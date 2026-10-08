import React, { useState } from 'react';
import { ProGroMoneyLogo } from '../ProGroMoneyLogo';
import { PersonalLoanArtwork } from '../PersonalLoanArtwork';
import { IndicativeEmiEstimator } from './IndicativeEmiEstimator';
import { MoneyEnquiryData } from '../../types';

interface LoanCardItem {
  id: string;
  name: string;
  rate: string;
  tenure: string;
  highlight: string;
  loanTypeVal: MoneyEnquiryData['loanType'];
}

const LOAN_CARDS: LoanCardItem[] = [
  {
    id: 'personal',
    name: 'Personal Loan',
    rate: '9.99% – 35% p.a.',
    tenure: '12 – 60 Months',
    highlight: 'No collateral • Medical, travel or urgent personal needs',
    loanTypeVal: 'Personal Loan',
  },
  {
    id: 'business',
    name: 'Business Loan',
    rate: '14% – 17% p.a.',
    tenure: '12 – 48 Months',
    highlight: 'Working capital & expansion • Based on GST turnover',
    loanTypeVal: 'Business Loan',
  },
  {
    id: 'home',
    name: 'Home Loan',
    rate: '9% – 18% p.a.',
    tenure: 'Up to 30 Years',
    highlight: 'New home purchase, construction or balance transfer',
    loanTypeVal: 'Home Loan',
  },
  {
    id: 'lap',
    name: 'Loan Against Property',
    rate: '10% – 18% p.a.',
    tenure: 'Up to 15 Years',
    highlight: 'High-value funding backed by residential or commercial property',
    loanTypeVal: 'Loan Against Property',
  },
];

export const ProGroMoneyPage: React.FC = () => {
  const [formData, setFormData] = useState<MoneyEnquiryData>({
    fullName: '',
    phoneNumber: '',
    city: '',
    loanType: 'Personal Loan',
    approxAmount: '',
    bestContactTime: 'Morning (9 AM - 12 PM)',
    consentGiven: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<MoneyEnquiryData | null>(null);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  const scrollToForm = (loanType?: MoneyEnquiryData['loanType']) => {
    if (loanType) {
      setFormData((prev) => ({ ...prev, loanType }));
    }
    const el = document.getElementById('enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errors.fullName = 'Enter your full name (minimum 3 characters)';
    }

    const cleanPhone = formData.phoneNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
      errors.phoneNumber = 'Enter a valid 10-digit mobile number';
    }

    if (!formData.city.trim() || formData.city.trim().length < 2) {
      errors.city = 'Enter your city of residence';
    }

    const cleanAmount = formData.approxAmount.replace(/,/g, '').trim();
    if (!cleanAmount || isNaN(Number(cleanAmount)) || Number(cleanAmount) < 10000) {
      errors.approxAmount = 'Enter loan amount (min ₹10,000)';
    }

    if (!formData.consentGiven) {
      errors.consentGiven = 'Consent to be contacted is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      setShowSetupModal(true);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <ProGroMoneyLogo size="md" />
          <button
            onClick={() => scrollToForm()}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-sm min-h-[44px]"
          >
            Start Enquiry
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="space-y-3">
          {/* 4 Highlighted Button-like Badges (Including Loan Against Property) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToForm('Personal Loan')}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 font-bold text-[11px] sm:text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              PERSONAL LOANS
            </button>
            <button
              type="button"
              onClick={() => scrollToForm('Business Loan')}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 font-bold text-[11px] sm:text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              BUSINESS LOANS
            </button>
            <button
              type="button"
              onClick={() => scrollToForm('Home Loan')}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 font-bold text-[11px] sm:text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              HOME LOANS
            </button>
            <button
              type="button"
              onClick={() => scrollToForm('Loan Against Property')}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 font-bold text-[11px] sm:text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              LOAN AGAINST PROPERTY
            </button>
          </div>

          <div className="space-y-1">
            <h1 className="font-display text-lg sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              Compare Indicative Loan Rates Across Lenders
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-600 max-w-xl leading-relaxed">
              Rates are indicative. The lending institution decides the final rate, fees and approval after assessment.
            </p>
          </div>

          {/* Personal Loan Artwork Banner Slot */}
          <PersonalLoanArtwork onApplyClick={() => scrollToForm('Personal Loan')} />
        </section>

        {/* 4 Loan Cards (Arranged 2x2 together as requested: 'box ko ek sath do rakho') */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Indicative Loan Products
            </h2>
            <span className="text-[11px] text-slate-500 font-medium">
              Indicative ROI only
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
            {LOAN_CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() => scrollToForm(card.loanTypeVal)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToForm(card.loanTypeVal);
                  }
                }}
                className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.98]"
              >
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-display font-bold text-slate-900 text-xs sm:text-base leading-snug group-hover:text-emerald-700 transition-colors">
                      {card.name}
                    </h3>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                      Indicative
                    </span>
                  </div>

                  <div className="pt-0.5">
                    <span className="text-sm sm:text-xl font-extrabold font-mono text-emerald-700 tracking-tight block leading-tight">
                      {card.rate}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono block mt-0.5">
                      ({card.tenure})
                    </span>
                  </div>

                  <p className="text-[10px] sm:text-xs text-slate-600 leading-normal line-clamp-2 sm:line-clamp-none">
                    {card.highlight}
                  </p>
                </div>

                <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                  <span>Start Enquiry</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Indicative EMI Estimator Informational Tool */}
        <IndicativeEmiEstimator />

        {/* Clean 3-Step Process */}
        <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
          <h2 className="font-display text-base font-bold text-slate-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <span className="font-mono font-bold text-emerald-700 text-xs">1. Fill Form</span>
              <p className="text-slate-600 text-[11px]">Submit basic details and preferred call time. No KYC documents required.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <span className="font-mono font-bold text-emerald-700 text-xs">2. Channel Call</span>
              <p className="text-slate-600 text-[11px]">Authorized DSA partner reviews your requirements and lender options.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <span className="font-mono font-bold text-emerald-700 text-xs">3. Direct Sanction</span>
              <p className="text-slate-600 text-[11px]">Submit documents directly to the chosen bank/NBFC for appraisal.</p>
            </div>
          </div>
        </section>

        {/* Minimal Loan Enquiry Form */}
        <section id="enquiry-form" className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Loan Enquiry Form
              </h2>
              <p className="text-xs text-slate-500">
                Enquiry assistance • No document uploads • AI Studio Preview Mode
              </p>
            </div>
            <img 
              src="/progro-money-logo.svg" 
              alt="ProGro Money" 
              className="w-10 h-10 rounded-full shadow-xs shrink-0" 
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-slate-800 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                }}
                placeholder="e.g. Ramesh Kumar"
                className={`w-full text-xs px-3 py-2.5 rounded-lg border bg-white min-h-[44px] ${
                  formErrors.fullName ? 'border-red-400' : 'border-slate-300 focus:border-emerald-600'
                } focus:outline-none focus:ring-1 focus:ring-emerald-500`}
              />
              {formErrors.fullName && <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="phoneNumber" className="block text-xs font-semibold text-slate-800 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs text-slate-400 font-semibold select-none">+91</span>
                  <input
                    id="phoneNumber"
                    type="tel"
                    maxLength={10}
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setFormData({ ...formData, phoneNumber: val });
                      if (formErrors.phoneNumber) setFormErrors({ ...formErrors, phoneNumber: '' });
                    }}
                    placeholder="9876543210"
                    className={`w-full text-xs pl-11 pr-3 py-2.5 rounded-lg border bg-white min-h-[44px] ${
                      formErrors.phoneNumber ? 'border-red-400' : 'border-slate-300 focus:border-emerald-600'
                    } focus:outline-none focus:ring-1 focus:ring-emerald-500`}
                  />
                </div>
                {formErrors.phoneNumber && <p className="text-[11px] text-red-600 mt-1">{formErrors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-xs font-semibold text-slate-800 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => {
                    setFormData({ ...formData, city: e.target.value });
                    if (formErrors.city) setFormErrors({ ...formErrors, city: '' });
                  }}
                  placeholder="e.g. Delhi, Mumbai, Bengaluru"
                  className={`w-full text-xs px-3 py-2.5 rounded-lg border bg-white min-h-[44px] ${
                    formErrors.city ? 'border-red-400' : 'border-slate-300 focus:border-emerald-600'
                  } focus:outline-none focus:ring-1 focus:ring-emerald-500`}
                />
                {formErrors.city && <p className="text-[11px] text-red-600 mt-1">{formErrors.city}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="loanType" className="block text-xs font-semibold text-slate-800 mb-1">
                  Loan Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="loanType"
                  value={formData.loanType}
                  onChange={(e) =>
                    setFormData({ ...formData, loanType: e.target.value as MoneyEnquiryData['loanType'] })
                  }
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 bg-white min-h-[44px] focus:outline-none focus:border-emerald-600"
                >
                  <option value="Personal Loan">Personal Loan (9.99% - 35%)</option>
                  <option value="Business Loan">Business Loan (14% - 17%)</option>
                  <option value="Home Loan">Home Loan (9% - 18%)</option>
                  <option value="Loan Against Property">Loan Against Property (10% - 18%)</option>
                </select>
              </div>

              <div>
                <label htmlFor="approxAmount" className="block text-xs font-semibold text-slate-800 mb-1">
                  Approx Amount (&inr;) <span className="text-red-500">*</span>
                </label>
                <input
                  id="approxAmount"
                  type="text"
                  value={formData.approxAmount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d,]/g, '');
                    setFormData({ ...formData, approxAmount: val });
                    if (formErrors.approxAmount) setFormErrors({ ...formErrors, approxAmount: '' });
                  }}
                  placeholder="e.g. 5,00,000"
                  className={`w-full text-xs px-3 py-2.5 rounded-lg border bg-white min-h-[44px] ${
                    formErrors.approxAmount ? 'border-red-400' : 'border-slate-300 focus:border-emerald-600'
                  } focus:outline-none focus:ring-1 focus:ring-emerald-500`}
                />
                {formErrors.approxAmount && <p className="text-[11px] text-red-600 mt-1">{formErrors.approxAmount}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="bestContactTime" className="block text-xs font-semibold text-slate-800 mb-1">
                Best Contact Time <span className="text-red-500">*</span>
              </label>
              <select
                id="bestContactTime"
                value={formData.bestContactTime}
                onChange={(e) =>
                  setFormData({ ...formData, bestContactTime: e.target.value as MoneyEnquiryData['bestContactTime'] })
                }
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 bg-white min-h-[44px] focus:outline-none focus:border-emerald-600"
              >
                <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                <option value="Weekend (Anytime)">Weekend (Anytime)</option>
              </select>
            </div>

            {/* Security note & consent */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <strong>Borrower Security:</strong> Never upload PAN, Aadhaar or bank statements on online web forms. Only share verification documents directly with the verified bank or NBFC representative.
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentGiven}
                  onChange={(e) => {
                    setFormData({ ...formData, consentGiven: e.target.checked });
                    if (formErrors.consentGiven) setFormErrors({ ...formErrors, consentGiven: '' });
                  }}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-600 leading-tight">
                  I authorize ProGro loan enquiry assistance and its partner DSA channel representatives to contact me via Call or SMS regarding this query.{' '}
                  <button
                    type="button"
                    onClick={() => setActiveModal('privacy')}
                    className="text-emerald-700 underline font-semibold"
                  >
                    Privacy
                  </button>{' '}
                  &amp;{' '}
                  <button
                    type="button"
                    onClick={() => setActiveModal('terms')}
                    className="text-emerald-700 underline font-semibold"
                  >
                    Terms
                  </button>.
                </span>
              </label>
              {formErrors.consentGiven && <p className="text-[11px] text-red-600">{formErrors.consentGiven}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm min-h-[48px] active:scale-[0.99]"
            >
              {isSubmitting ? 'Processing...' : 'Submit Loan Enquiry'}
            </button>
          </form>
        </section>

        {/* Essential FAQ Accordions (Concise) */}
        <section className="space-y-2">
          <h2 className="font-display text-base font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2 text-xs">
            <details className="bg-white rounded-xl border border-slate-200 p-3.5 cursor-pointer">
              <summary className="font-semibold text-slate-900 list-none flex justify-between items-center">
                <span>Is ProGro Money a lender?</span>
                <span className="text-slate-400">&darr;</span>
              </summary>
              <p className="mt-2 text-slate-600 text-[11px] leading-relaxed border-t border-slate-100 pt-2">
                No. ProGro Money operates as an assistance channel through registered bank DSA and NBFC networks. We are not a bank or NBFC. The final loan sanction decision belongs solely to the lending institution.
              </p>
            </details>

            <details className="bg-white rounded-xl border border-slate-200 p-3.5 cursor-pointer">
              <summary className="font-semibold text-slate-900 list-none flex justify-between items-center">
                <span>Are the displayed interest rates guaranteed?</span>
                <span className="text-slate-400">&darr;</span>
              </summary>
              <p className="mt-2 text-slate-600 text-[11px] leading-relaxed border-t border-slate-100 pt-2">
                All rates (Personal 9.99%–35%, Business 14%–17%, Home 9%–18%, LAP 10%–18%) are indicative. Actual rates depend on your credit score, employer, income, and lender evaluation.
              </p>
            </details>

            <details className="bg-white rounded-xl border border-slate-200 p-3.5 cursor-pointer">
              <summary className="font-semibold text-slate-900 list-none flex justify-between items-center">
                <span>Do I have to pay any upfront fee?</span>
                <span className="text-slate-400">&darr;</span>
              </summary>
              <p className="mt-2 text-slate-600 text-[11px] leading-relaxed border-t border-slate-100 pt-2">
                No. ProGro Money does not charge any upfront consultation or application fees.
              </p>
            </details>
          </div>
        </section>
      </main>

      {/* Reference Styled Dark Footer */}
      <footer className="mt-14 bg-[#0a1226] text-white border-t border-slate-800 pt-10 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Top Brand Lockup */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
              <img 
                src="/progro-money-logo.svg" 
                alt="ProGro Money" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-extrabold text-2xl text-white tracking-tight">
                  ProGro
                </span>
                <span className="font-display font-extrabold text-2xl text-emerald-400 tracking-tight">
                  Money
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
            Loan assistance through Bank DSA and NBFC channels across India.
          </p>

          {/* Transparency Disclosures Box */}
          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed">
            <p className="font-medium text-slate-200">
              We charge no advance or service fee. If a lender applies any charges, it will disclose them before you proceed.
            </p>
            <p className="text-slate-400 text-[11px]">
              The lender decides your eligibility, final rate and approval. Approval and disbursal are not guaranteed.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold pt-0.5">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No documents are uploaded through this enquiry form.</span>
            </div>
          </div>

          {/* Pill Badge */}
          <div>
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Bank DSA Channel
              </span>
              <span className="text-emerald-600">•</span>
              <span>NBFC Partners</span>
              <span className="text-emerald-600">•</span>
              <span>Zero Advance Fees</span>
            </div>
          </div>

          {/* NEED LOAN ASSISTANCE? */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase block">
              NEED LOAN ASSISTANCE?
            </span>
            <p className="text-slate-300 text-xs leading-relaxed max-w-lg">
              Have a question or need loan guidance? Connect directly with our enquiry channel desk.
            </p>

            <div className="pt-1 space-y-2">
              <button
                type="button"
                onClick={() => scrollToForm()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition-all active:scale-95 min-h-[44px]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
                </svg>
                <span>REQUEST LOAN CALL BACK</span>
              </button>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>No fee charged by ProGro; lender charges, if any, are disclosed separately</span>
              </div>
            </div>
          </div>

          {/* Horizontal Divider */}
          <div className="border-t border-slate-800/80 pt-6"></div>

          {/* OUR LOAN SERVICES */}
          <div className="space-y-2.5 text-center">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block">
              OUR LOAN SERVICES
            </span>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-200">
              <button 
                onClick={() => scrollToForm('Personal Loan')} 
                className="hover:text-emerald-400 transition-colors"
              >
                Personal Loan
              </button>
              <span className="text-slate-600">•</span>
              <button 
                onClick={() => scrollToForm('Business Loan')} 
                className="hover:text-emerald-400 transition-colors"
              >
                Business Loan
              </button>
              <span className="text-slate-600">•</span>
              <button 
                onClick={() => scrollToForm('Home Loan')} 
                className="hover:text-emerald-400 transition-colors"
              >
                Home Loan
              </button>
              <span className="text-slate-600">•</span>
              <button 
                onClick={() => scrollToForm('Loan Against Property')} 
                className="hover:text-emerald-400 transition-colors"
              >
                Loan Against Property
              </button>
            </div>
          </div>

          {/* Bottom Policy Links & Copyright */}
          <div className="pt-4 border-t border-slate-800/60 flex flex-col items-center gap-3 text-center text-xs text-slate-400">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </button>
              <span className="text-slate-600">·</span>
              <button onClick={() => setActiveModal('terms')} className="hover:text-emerald-400 transition-colors">
                Terms
              </button>
              <span className="text-slate-600">·</span>
              <button onClick={() => setActiveModal('contact')} className="hover:text-emerald-400 transition-colors">
                Contact
              </button>
            </div>

            <p className="text-[11px] text-slate-500">
              &copy; {new Date().getFullYear()} ProGro Money. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* SETUP STATE MODAL */}
      {showSetupModal && submittedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3.5 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-2.5">
              <img 
                src="/progro-money-logo.svg" 
                alt="ProGro Money" 
                className="w-10 h-10 rounded-full shadow-xs shrink-0" 
              />
              <div>
                <h3 className="font-display font-bold text-slate-900 text-sm">
                  Draft Preview: Setup State
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  No External Backend Connected
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              This is an AI Studio preview draft. The form does not transmit or store personal data. Before going public, a verified enquiry backend or contact destination must be connected.
            </p>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-[11px] font-mono space-y-1 text-slate-700">
              <div><strong>Name:</strong> {submittedData.fullName}</div>
              <div><strong>Phone:</strong> +91 {submittedData.phoneNumber}</div>
              <div><strong>City:</strong> {submittedData.city}</div>
              <div><strong>Loan Type:</strong> {submittedData.loanType}</div>
              <div><strong>Amount:</strong> &inr; {submittedData.approxAmount}</div>
              <div><strong>Call Window:</strong> {submittedData.bestContactTime}</div>
            </div>

            <button
              type="button"
              onClick={() => setShowSetupModal(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors min-h-[44px]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Policy Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-display font-bold text-slate-900 text-sm capitalize">
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'terms' && 'Terms of Channel Assistance'}
                {activeModal === 'contact' && 'Contact & Enquiry Channel'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 text-base font-bold p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                &times;
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              {activeModal === 'privacy' && (
                <>
                  <p>1. We only collect the minimal contact details you enter on this form.</p>
                  <p>2. We never ask for or store PAN cards, Aadhaar numbers, or bank passwords.</p>
                  <p>3. Information is used solely to facilitate your loan enquiry consultation.</p>
                </>
              )}
              {activeModal === 'terms' && (
                <>
                  <p>1. ProGro operates as an enquiry channel through bank DSA/NBFC partner networks.</p>
                  <p>2. ProGro is not a lender, bank, or NBFC. Sanction decisions belong exclusively to the lending partner.</p>
                  <p>3. All displayed interest rates are indicative only.</p>
                </>
              )}
              {activeModal === 'contact' && (
                <>
                  <p>For channel queries and assistance:</p>
                  <p className="font-mono text-[11px] bg-slate-50 p-2 rounded">
                    Operating Hours: Mon - Sat (10:00 AM - 6:30 PM IST)<br />
                    Channel: ProGro Money Enquiry Channel
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
