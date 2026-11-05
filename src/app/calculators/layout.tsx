import type { Metadata } from 'next';
import React from 'react';
import { FaqJsonLd, BreadcrumbJsonLd } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'UP Stamp Duty & Home Loan EMI Calculator (2026) | EstateOS',
  description: 'Calculate UP stamp duty charges, home loan EMI (from 8.35%), borrowing eligibility & rental yield. 100% verified 2026 banking & state sub-registrar rates.',
  keywords: 'up stamp duty calculator 2026, home loan emi calculator india, home loan interest rates 2026 sbi hdfc, rental yield calculator india, property registration charges in uttar pradesh',
  alternates: {
    canonical: 'https://www.estateospro.in/calculators',
  },
  openGraph: {
    title: 'UP Stamp Duty & Home Loan EMI Calculator (2026) | EstateOS',
    description: 'Calculate UP stamp duty charges, home loan EMI (from 8.35%), borrowing eligibility & rental yield. 100% verified 2026 banking & state sub-registrar rates.',
    url: 'https://www.estateospro.in/calculators',
    type: 'website',
  },
};

const CALCULATOR_FAQS = [
  {
    question: 'How is Stamp Duty calculated in Uttar Pradesh for females vs males?',
    answer: 'In Uttar Pradesh, male buyers pay 7.0% stamp duty plus a 1.0% registration fee (total 8.0%). Female buyers receive a government concession and pay 6.0% stamp duty plus 1.0% registration (total 7.0%). Joint male-female ownership is taxed at 6.5% stamp duty plus 1.0% registration fee.',
  },
  {
    question: 'What is the current home loan interest rate across SBI, HDFC, and ICICI in 2026?',
    answer: 'Home loan interest rates for prime borrowers with CIBIL score 750+ range from 8.35% to 8.75% per annum. Special concessions of 0.05% are frequently extended to women co-borrowers and salaried government employees.',
  },
  {
    question: 'How is net rental capitalization yield computed on residential property?',
    answer: 'Net rental yield equals (Annual Gross Rental Income minus Annual Maintenance and Municipal Property Tax) divided by Total Property Cost multiplied by 100. Average residential rental yields in India typically hover between 3.2% and 4.5%.',
  },
  {
    question: 'What is the statutory RERA carpet area loading percentage?',
    answer: 'Under Section 2(k) of the RERA Act 2016, developers can only charge buyers on net usable internal carpet area excluding external walls, common corridors, and lift shafts. Standard multi-storey apartment loading typically ranges between 20% and 28%.',
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
