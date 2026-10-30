'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  QrCode,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  AlertCircle,
  X,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: number;
  billingCycle: 'MONTHLY' | 'YEARLY';
  onSuccess: (data: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
}

export default function RazorpayModal({
  isOpen,
  onClose,
  planName,
  amount,
  billingCycle,
  onSuccess,
}: RazorpayModalProps) {
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking' | 'qr'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim'>('gpay');
  const [upiId, setUpiId] = useState('agent@okaxis');
  const [cardNumber, setCardNumber] = useState('4111 1111 1111 1111');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');
  const [cardName, setCardName] = useState('Rahul Sharma');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setProcessingStep('Connecting to Razorpay Banking Gateway...');

    setTimeout(() => {
      setProcessingStep(
        activeTab === 'upi'
          ? `Waiting for approval on ${selectedUpiApp.toUpperCase()}...`
          : activeTab === 'card'
          ? 'Authorizing 3D Secure OTP with Card Network...'
          : `Connecting to ${selectedBank} NetBanking Gateway...`
      );
    }, 600);

    setTimeout(() => {
      setProcessingStep('Payment captured successfully! Issuing tax invoice...');
    }, 1300);

    setTimeout(() => {
      setIsProcessing(false);
      const paymentId = `pay_rzp_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      const orderId = `order_${Date.now()}`;
      const signature = `sig_${Math.random().toString(36).substring(2, 14)}`;
      onSuccess({
        razorpay_payment_id: paymentId,
        razorpay_order_id: orderId,
        razorpay_signature: signature,
      });
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-[#0b1b2d] text-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-700 relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Razorpay-style Test Mode Ribbon */}
        <div className="absolute top-0 right-0 z-20 pointer-events-none">
          <div className="bg-red-600 text-white font-black text-[10px] tracking-wider py-1 px-8 shadow-md transform rotate-45 translate-x-7 translate-y-3">
            TEST MODE
          </div>
        </div>

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-3.5 left-3.5 z-30 w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Section */}
        <div className="bg-[#0c2340] border-b border-slate-700/80 px-6 py-4 pl-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest-900 border border-gold-accent/40 flex items-center justify-center font-serif font-black text-gold-accent text-lg shadow-inner">
              E
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-white tracking-tight">EstateOS Intelligence</h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded">
                  Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {planName} Plan • {billingCycle === 'YEARLY' ? 'Annual Subscription' : 'Monthly Plan'}
              </p>
            </div>
          </div>
          <div className="text-right pr-12">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Payable
            </span>
            <span className="font-serif font-black text-xl text-white">
              {formatCurrencyINR(amount)}
            </span>
          </div>
        </div>

        {/* Modal Body: Left Tab Sidebar + Right Content Pane */}
        <div className="grid grid-cols-1 sm:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Payment Method Tabs */}
          <div className="sm:col-span-4 bg-[#081321] border-r border-slate-800 p-3 space-y-1 text-xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1 block">
              Payment Options
            </span>

            <button
              type="button"
              onClick={() => setActiveTab('upi')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'upi'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>UPI Apps</span>
              </div>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-black">
                FAST
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('qr')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'qr'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-purple-400" />
                <span>UPI QR Code</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('card')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'card'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-400" />
                <span>Card (Test)</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('netbanking')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'netbanking'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-400" />
                <span>NetBanking</span>
              </div>
            </button>
          </div>

          {/* Right Content Pane */}
          <div className="sm:col-span-8 p-5 sm:p-6 bg-[#0b1b2d] flex flex-col justify-between">
            {/* TAB 1: UPI APPS */}
            {activeTab === 'upi' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Select Your UPI App:
                  </h5>
                  <span className="text-[10px] text-slate-400">Zero Gateway Surcharge</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'gpay', name: 'Google Pay', handle: 'gpay@okaxis', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300' },
                    { id: 'phonepe', name: 'PhonePe UPI', handle: 'phonepe@ybl', color: 'border-purple-500/40 bg-purple-950/20 text-purple-300' },
                    { id: 'paytm', name: 'Paytm UPI', handle: 'paytm@paytm', color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300' },
                    { id: 'bhim', name: 'BHIM UPI', handle: 'bhim@upi', color: 'border-amber-500/40 bg-amber-950/20 text-amber-300' },
                  ].map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => {
                        setSelectedUpiApp(app.id as any);
                        setUpiId(app.handle);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedUpiApp === app.id
                          ? `${app.color} ring-2 ring-blue-500 shadow-md`
                          : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-bold text-white block">{app.name}</strong>
                        {selectedUpiApp === app.id && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{app.handle}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-xs space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 block">
                    Or Enter Custom UPI ID / VPA:
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                    placeholder="yourname@okaxis"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: UPI QR CODE */}
            {activeTab === 'qr' && (
              <div className="space-y-4 text-center flex flex-col items-center">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Scan & Pay with Any UPI App
                </h5>
                <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-slate-700 w-48 h-48 flex flex-col items-center justify-center relative">
                  {/* Stylized QR Matrix Pattern */}
                  <div className="w-full h-full bg-slate-100 rounded-lg p-2 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-8 h-8 border-4 border-black bg-black p-0.5"><div className="w-full h-full bg-white p-0.5"><div className="w-full h-full bg-black"></div></div></div>
                      <div className="w-8 h-8 border-4 border-black bg-black p-0.5"><div className="w-full h-full bg-white p-0.5"><div className="w-full h-full bg-black"></div></div></div>
                    </div>
                    <div className="text-center font-bold text-forest-950 font-serif text-[13px] tracking-tight">
                      EstateOS UPI
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="w-8 h-8 border-4 border-black bg-black p-0.5"><div className="w-full h-full bg-white p-0.5"><div className="w-full h-full bg-black"></div></div></div>
                      <div className="text-[8px] font-mono text-charcoal-700 font-bold">BHIM • GPAY • PHONEY</div>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Point camera or UPI scanner at QR code to auto-populate {formatCurrencyINR(amount)}.
                </p>
              </div>
            )}

            {/* TAB 3: CARDS */}
            {activeTab === 'card' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Razorpay Test Card Details:
                  </h5>
                  <button
                    type="button"
                    onClick={() => {
                      setCardNumber('4111 1111 1111 1111');
                      setCardExpiry('12/28');
                      setCardCvv('123');
                    }}
                    className="text-[10px] text-blue-400 hover:text-blue-300 font-bold underline"
                  >
                    Autofill Test Card
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Name on Card</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: NETBANKING */}
            {activeTab === 'netbanking' && (
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Popular Bank:
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                        selectedBank === bank
                          ? 'border-blue-500 bg-blue-950/40 text-blue-300 ring-1 ring-blue-500'
                          : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-blue-900/30 transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-75"
              >
                <Lock className="w-4 h-4 text-blue-200" />
                <span>
                  {isProcessing ? 'Processing Transaction...' : `Pay ${formatCurrencyINR(amount)}`}
                </span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Secured by <strong>Razorpay India</strong></span>
                </span>
                <span>PCI-DSS Level 1 Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Payment Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 z-40 bg-[#081321]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin mb-4" />
            <h4 className="text-base font-bold text-white mb-1">
              Securing Payment with Razorpay
            </h4>
            <p className="text-xs text-blue-300 font-mono animate-pulse">
              {processingStep}
            </p>
            <span className="text-[10px] text-slate-500 mt-4 block">
              Do not refresh this page. Your session is cryptographically secured.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
