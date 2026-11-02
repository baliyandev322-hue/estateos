import React from 'react';
import type { Metadata } from 'next';
import HomeLoansClient from './HomeLoansClient';

export const metadata: Metadata = {
  title: 'Home Loans & Mortgage Pre-Approval Desk — EstateOS',
  description: 'Compare lowest home loan interest rates from 8.35% p.a. across HDFC Bank, SBI, ICICI, and Axis Bank. Zero processing fee, doorstep documentation, and instant pre-sanction via EstateOS Partner DSA.',
  keywords: 'home loan muzaffarnagar, hdfc home loan, sbi home loan interest rate, home loan eligibility, instant home loan pre sanction, lowest home loan interest rate india 2026',
  alternates: {
    canonical: 'https://www.estateospro.in/home-loans',
  },
};

export default function HomeLoansPage() {
  return <HomeLoansClient />;
}
