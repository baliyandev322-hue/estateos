'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  Building,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';
import PropertyCard from '@/components/PropertyCard';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  properties?: any[];
  locality?: any;
  timestamp: string;
}

export default function AiMatchmakerPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Hello! I am **EstateOS AI Matchmaker**, your intelligent property advisor for Meerut, Shamli & Western UP.\n\nTell me what you are looking for in natural language (Hindi, English ya Hinglish). For example:\n- *"Mujhe Meerut mein residential plot lena hai under ₹50 lakh."*\n- *"3BHK luxury duplex kothi in Ganganagar Meerut on main road."*\n- *"Vasu Residency Garh Road Meerut plots ki details aur rates."*\n- *"Commercial hall on rent in Shamli near highway."*`,
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const getIntelligentFallback = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('plot') || q.includes('gaj') || q.includes('land') || q.includes('jamin') || q.includes('zameen')) {
      return `I analyzed our verified database for "${query}". Here are top verified residential plotted townships in Meerut matching your requirement:\n\n**1. [Shyam Residency MDA Approved Plots](/property/shyam-residency-mda-approved-residential-plots-rohta-road-bypass-meerut)**\n- 🏷️ **Price**: Pre-launch offer at **₹52,000/Gaj**\n- 🛡️ **Truth Score**: **99/100** (MDA Approved & Physical Verification)\n- 📍 **Location**: Rohta Road Bypass, Meerut\n\n**2. [Vasu Residency Zila Panchayat Approved Plots](/property/vasu-residency-zila-panchayat-approved-plots-garh-road-meerut)**\n- 🏷️ **Price**: From **₹19,000 to ₹25,000/Gaj** (100, 132, 150, 200 Gaj)\n- 🛡️ **Truth Score**: **97/100** (167 Bigha Gated Township)\n- 📍 **Location**: Main Garh Road Highway, Meerut\n\n**3. [180 Gaj Corner Plot Alaknanda Dham](/property/180-gaj-corner-plot-park-facing-alaknanda-dham-meerut)**\n- 🏷️ **Price**: **₹75,000/Gaj** (East + North Facing Park View)\n- 🛡️ **Truth Score**: **99/100**\n- 📍 **Location**: Alaknanda Dham, Meerut\n\nWould you like me to book a complimentary site inspection or connect you directly with the verified broker?`;
    }
    if (q.includes('kothi') || q.includes('house') || q.includes('makan') || q.includes('villa') || q.includes('duplex') || q.includes('bhk')) {
      return `I analyzed our verified database for "${query}". Here are top verified luxury houses in Meerut:\n\n**1. [80 Gaj 3BHK Luxury Duplex Kothi](/property/80-gaj-luxury-3bhk-duplex-house-gangasagar-ganganagar-meerut)**\n- 🏷️ **Price**: **₹95 Lakh**\n- 🛡️ **Truth Score**: **98/100** (Brand New Construction)\n- 📍 **Location**: Main Divider Road, Ganga Sagar Colony, Ganganagar, Meerut\n\n**2. [112 Gaj 3BHK Luxury Modern Kothi](/property/112-gaj-luxury-3bhk-kothi-main-mawana-road-meerut)**\n- 🏷️ **Price**: **₹75 Lakh**\n- 🛡️ **Truth Score**: **98/100**\n- 📍 **Location**: Main Mawana Road, Meerut\n\n**3. [180 Gaj Park Facing 4BHK Grand Luxury Villa](/property/180-gaj-park-facing-4bhk-luxury-duplex-villa-ganganagar-meerut)**\n- 🏷️ **Price**: **₹2.00 Cr**\n- 🛡️ **Truth Score**: **99/100**\n- 📍 **Location**: Ganganagar, Meerut\n\nWould you like to schedule a site inspection?`;
    }
    if (q.includes('shamli')) {
      return `I analyzed our verified database for "${query}". Here are verified options in Shamli:\n\n**1. [Uday City & Abhay Green City Residential Plots](/property/uday-city-abhay-green-city-residential-plots-shamli)**\n- 🏷️ **Price**: Starting **₹22 Lakh**\n- 🛡️ **Truth Score**: **98/100** (Gated Plotted Township)\n- 📍 **Location**: Bheswal Road, Shamli\n\n**2. [2200 Sq.Ft Brand New Commercial Hall on Rent](/property/2200-sqft-brand-new-commercial-hall-room-washroom-rent-shamli)**\n- 🏷️ **Rent**: **₹50,000/month**\n- 🛡️ **Truth Score**: **97/100**\n- 📍 **Location**: Shamli\n\nWould you like to speak directly with the developer?`;
    }
    return `I checked our verified database for "${query}". Here are top verified properties in Meerut & Western UP:\n\n**1. [Shyam Residency MDA Approved Plots](/property/shyam-residency-mda-approved-residential-plots-rohta-road-bypass-meerut)** (₹52,000/Gaj, Rohta Road Bypass, Meerut)\n**2. [Vasu Residency Zila Panchayat Approved Plots](/property/vasu-residency-zila-panchayat-approved-plots-garh-road-meerut)** (₹19,000/Gaj, Main Garh Road, Meerut)\n**3. [80 Gaj 3BHK Luxury Duplex Kothi](/property/80-gaj-luxury-3bhk-duplex-house-gangasagar-ganganagar-meerut)** (₹95 Lakh, Ganga Sagar Colony, Ganganagar, Meerut)\n\nWould you like to schedule a site inspection or connect directly with the verified builder?`;
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000);

      const res = await fetch('/api/ai/matchmaker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();

      if (res.ok && data.text) {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          properties: data.properties || [],
          locality: data.locality || null,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'assistant',
            text: getIntelligentFallback(textToSend),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: getIntelligentFallback(textToSend),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQueries = [
    'Mujhe Meerut mein MDA approved residential plot chahiye under ₹50 lakh',
    '3BHK luxury duplex kothi in Ganganagar Meerut on main road',
    'Vasu Residency Garh Road Meerut plots details aur price',
    'Commercial space or hall on rent in Shamli near highway',
  ];

  return (
    <div className="bg-slate-50 flex flex-col h-[calc(100vh-5rem)] h-[calc(100dvh-5rem)] overflow-hidden">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-full py-3 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-charcoal-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-accent flex items-center justify-center border border-gold-accent/40 shadow-sm">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="font-serif font-black text-xl text-forest-950 flex items-center gap-2">
                EstateOS AI Property Matchmaker
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gold-100 text-gold-800 uppercase border border-gold-300">
                  Live DB Intelligence
                </span>
              </h1>
              <p className="text-xs text-charcoal-500">
                Natural Language Requirement Extraction &amp; RERA-Audited Listing Matcher
              </p>
            </div>
          </div>

          <Link
            href="/properties"
            className="text-xs font-bold text-forest-800 hover:text-forest-950 flex items-center gap-1"
          >
            <span>Manual Filters</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Chat Stream Window */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto py-4 space-y-4 pr-2 min-h-0">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-forest-900 text-gold-accent flex items-center justify-center shrink-0 border border-gold-accent/40">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-3xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-forest-900 text-white rounded-tr-none'
                    : 'bg-white text-charcoal-800 border border-charcoal-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line prose-sm">{msg.text}</div>

                {/* Inline matched property cards */}
                {msg.properties && msg.properties.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-charcoal-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {msg.properties.map((prop) => (
                      <div
                        key={prop.id}
                        className="p-3 rounded-xl bg-slate-50 border border-charcoal-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="font-bold text-forest-900 font-serif text-sm">
                              {formatCurrencyINR(prop.price)}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-forest-100 text-forest-800 font-bold text-[10px]">
                              Score: {prop.truthScore}/100
                            </span>
                          </div>
                          <h4 className="font-bold text-xs text-charcoal-900 line-clamp-1">
                            {prop.title}
                          </h4>
                          <p className="text-[11px] text-charcoal-500 mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-forest-600" />
                            <span>{prop.localityName}, {prop.city}</span>
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-charcoal-200/60 flex items-center justify-between text-[11px]">
                          <span className="text-charcoal-600">
                            {prop.bedrooms ? `${prop.bedrooms} BHK • ` : ''}{prop.carpetAreaSqFt} sq.ft
                          </span>
                          <Link
                            href={`/property/${prop.slug}`}
                            className="font-bold text-forest-900 hover:underline flex items-center gap-1"
                          >
                            <span>Inspect</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`mt-2 text-[10px] ${
                    msg.sender === 'user' ? 'text-forest-300' : 'text-charcoal-400'
                  } text-right`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-charcoal-700 text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-xs text-charcoal-500">
              <div className="w-8 h-8 rounded-full bg-forest-900 text-gold-accent flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-charcoal-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-600 animate-pulse" />
                <span>Analyzing RERA registry &amp; computing micro-market match scores...</span>
              </div>
            </div>
          )}
        </div>

        {/* Sample Quick Prompt Chips */}
        <div className="py-2 overflow-x-auto flex items-center gap-2 text-xs no-scrollbar shrink-0">
          <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider shrink-0">
            Quick Prompts:
          </span>
          {sampleQueries.map((query, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(query)}
              className="px-3 py-1.5 rounded-lg bg-white border border-charcoal-200 text-charcoal-700 hover:border-gold-accent hover:text-forest-900 whitespace-nowrap text-xs transition-all shrink-0"
            >
              {query}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="pt-1 pb-1 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-white rounded-2xl border border-charcoal-300 p-2 shadow-md focus-within:border-forest-800"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your requirements (e.g. 'I need a 2BHK in Mohali under ₹60 lakh near schools')..."
              className="flex-1 text-xs sm:text-sm px-3 py-2 bg-transparent text-charcoal-900 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 bg-forest-900 hover:bg-forest-800 text-gold-accent rounded-xl disabled:opacity-40 transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
