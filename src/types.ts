export interface MoneyEnquiryData {
  fullName: string;
  phoneNumber: string;
  city: string;
  loanType: 'Personal Loan' | 'Business Loan' | 'Home Loan' | 'Loan Against Property';
  approxAmount: string;
  bestContactTime: 'Morning (9 AM - 12 PM)' | 'Afternoon (12 PM - 4 PM)' | 'Evening (4 PM - 8 PM)' | 'Weekend (Anytime)';
  consentGiven: boolean;
}

