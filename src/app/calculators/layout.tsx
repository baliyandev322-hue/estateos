import type { Metadata } from 'next';
import React from 'react';
import { FaqJsonLd, BreadcrumbJsonLd } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Real Estate & Home Loan Calculators (EMI, Eligibility & Stamp Duty) | EstateOS',
  description: 'Interactive Indian property calculators: Home loan EMI calculator, borrowing eligibility, state-wise stamp duty ready reckoner, net rental yield, and RERA carpet area loading tool.',
  keywords: 'home loan emi calculator, property stamp duty calculator india, rental yield calculator, buy vs rent calculator, carpet area calculator rera',
  alternates: {
    canonical: 'https://www.estateospro.in/calculators',
  },
  openGraph: {
    title: 'Real Estate & Home Loan Calculators | EstateOS',
    description: 'Calculate home loan EMIs, bank eligibility, stamp duty and rental yields instantly with 2026 banking rates.',
    url: 'https://www.estateospro.in/calculators',
    type: 'website',
  },
};

const CALCULATOR_FAQS = [
  {
    question: 'How is home loan EMI calculated in India?',
    answer: 'Home loan EMI is calculated using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal loan amount, R is monthly interest rate, and N is loan tenure in months.',
  },
  {
    question: 'What is the standard stamp duty rate for property registration in India?',
    answer: 'Stamp duty typically ranges from 4% to 8% depending on the state, city municipal corporation, and gender of the buyer (many states like Punjab, Haryana, and Delhi offer 1-2% concessions for women).',
  },
  {
    question: 'What is the statutory RERA carpet area loading percentage?',
    answer: 'Under RERA guidelines, developers must price units based on usable internal carpet area. The difference between carpet area and super built-up area is loading, typically ranging from 18% to 28% in standard residential developments.',
  },
];

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Financial Calculators', url: '/calculators' },
        ]}
      />
      <FaqJsonLd faqs={CALCULATOR_FAQS} />
      {children}
    </>
  );
}
