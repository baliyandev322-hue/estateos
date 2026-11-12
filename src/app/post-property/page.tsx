'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  Loader2,
} from 'lucide-react';
import ImageUploadDropzone from '@/components/ImageUploadDropzone';

export default function PostPropertyPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [listingType, setListingType] = useState<'SALE' | 'RENT'>('SALE');
  const [propertyType, setPropertyType] = useState('APARTMENT');
  const [price, setPrice] = useState('');
  const [carpetAreaSqFt, setCarpetAreaSqFt] = useState('');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('2');
  const [city, setCity] = useState('Muzaffarnagar');
  const [localityName, setLocalityName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [reraId, setReraId] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !price || !carpetAreaSqFt || !localityName || !ownerPhone) {
      setError('Please fill in all mandatory fields (Title, Price, Area, Locality, Phone).');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/properties/quick-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          listingType,
          propertyType,
          price,
          carpetAreaSqFt,
          bedrooms: ['PLOT', 'COMMERCIAL'].includes(propertyType) ? 0 : bedrooms,
          bathrooms: ['PLOT', 'COMMERCIAL'].includes(propertyType) ? 0 : bathrooms,
          city,
          localityName,
          address,
          description,
          reraId,
          ownerName,
          ownerPhone,
          images,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to publish listing');
      }

      setSuccess(true);
      setCreatedSlug(data.slug);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-accent text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>EstateOS Sovereign Registry</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-forest-950 tracking-tight">
            List Your Property in 60 Seconds
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-charcoal-600 max-w-lg mx-auto">
            Reach thousands of pre-qualified buyers and get verified WhatsApp inquiries. 100% Free digital listing with Property Truth Score™.
          </p>
        </div>

        {/* Success Card */}
        {success && createdSlug ? (
          <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-black text-forest-950">
              Listing Published Successfully!
            </h2>
            <p className="text-xs text-charcoal-600 max-w-md mx-auto">
              Your property has been indexed on EstateOS and routed to active buyers. You will receive inquiries on <strong>{ownerPhone}</strong>.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/property/${createdSlug}`}
                className="py-3 px-6 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span>View Live Listing</span>
                <ArrowRight className="w-4 h-4 text-gold-accent" />
              </Link>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Namaste! ${title} (${localityName}, ${city}) ab EstateOS par Verified Listing ke roop me live ho gaya hai.\n\nDirect details & site visit link:\nhttps://www.estateospro.in/property/${createdSlug}\n\nApne WhatsApp Status par lagayein taaki buyers seedha aapko call karein!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Share on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setTitle('');
                  setPrice('');
                  setImages([]);
                }}
                className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-charcoal-800 font-bold text-xs transition-colors"
              >
                Post Another Property
              </button>
            </div>
          </div>
        ) : (
          /* Main Form Card */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-charcoal-200 shadow-xl space-y-6"
          >
            {error && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* 1. Basic Headline */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Property Headline / Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 3BHK Luxury Kothi in Gandhi Colony, Near Verma Park"
                className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-4 py-3 focus:outline-none focus:border-forest-700 transition-colors"
              />
            </div>

            {/* 2. Type & Purpose */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                  I Want To
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setListingType('SALE')}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      listingType === 'SALE'
                        ? 'bg-forest-900 text-white border-forest-900 shadow'
                        : 'bg-slate-50 text-charcoal-700 border-charcoal-200 hover:bg-slate-100'
                    }`}
                  >
                    Sell (Sale)
                  </button>
                  <button
                    type="button"
                    onClick={() => setListingType('RENT')}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      listingType === 'RENT'
                        ? 'bg-forest-900 text-white border-forest-900 shadow'
                        : 'bg-slate-50 text-charcoal-700 border-charcoal-200 hover:bg-slate-100'
                    }`}
                  >
                    Rent Out
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                  Property Category
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-forest-700"
                >
                  <option value="APARTMENT">Apartment / Builder Floor</option>
                  <option value="VILLA">Kothi / Independent Villa</option>
                  <option value="PLOT">Residential / Commercial Plot</option>
                  <option value="COMMERCIAL">Commercial Office / Showroom</option>
                  <option value="PENTHOUSE">Sky Penthouse</option>
                </select>
              </div>
            </div>

            {/* 3. Price & Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                  Total Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 6500000 (₹65 Lakh)"
                  className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-4 py-3 focus:outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                  Carpet Area (Sq.Ft / Sq.Yd) *
                </label>
                <input
                  type="number"
                  required
                  value={carpetAreaSqFt}
                  onChange={(e) => setCarpetAreaSqFt(e.target.value)}
                  placeholder="e.g. 1500"
                  className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-4 py-3 focus:outline-none focus:border-forest-700"
                />
              </div>
            </div>

            {/* 4. Configuration (if residential) */}
            {!['PLOT', 'COMMERCIAL'].includes(propertyType) && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    Bedrooms (BHK)
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 focus:outline-none"
                  >
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    Bathrooms
                  </label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 focus:outline-none"
                  >
                    <option value="1">1 Bath</option>
                    <option value="2">2 Baths</option>
                    <option value="3">3 Baths</option>
                    <option value="4">4+ Baths</option>
                  </select>
                </div>
              </div>
            )}

            {/* 5. Location details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-3 py-2.5 focus:outline-none"
                >
                  <option value="Muzaffarnagar">Muzaffarnagar (UP)</option>
                  <option value="Shamli">Shamli (UP)</option>
                  <option value="Meerut">Meerut (UP)</option>
                  <option value="Noida">Noida (NCR)</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mohali">Mohali</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                  Locality / Colony *
                </label>
                <input
                  type="text"
                  required
                  value={localityName}
                  onChange={(e) => setLocalityName(e.target.value)}
                  placeholder="e.g. Gandhi Colony, New Mandi, Circular Rd"
                  className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-4 py-3 focus:outline-none focus:border-forest-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Exact Address / Landmark
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Gali No. 8, Near SD Public School"
                className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-charcoal-200 rounded-xl px-4 py-3 focus:outline-none focus:border-forest-700"
              />
            </div>

            {/* 6. Direct Photo Upload Dropzone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Property Photos (Camera or Gallery)
              </label>
              <ImageUploadDropzone
                images={images}
                onChange={(newImages) => setImages(newImages)}
                maxFiles={6}
              />
            </div>

            {/* 7. Contact Details */}
            <div className="pt-4 border-t border-charcoal-100">
              <h3 className="font-serif font-bold text-base text-forest-950 mb-3">
                Contact &amp; Inquiry Routing
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    Your Name / Agency Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Dev Baliyan / Apex Realty"
                      className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-charcoal-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-forest-700"
                    />
                    <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      placeholder="+91 93685 93249"
                      className="w-full text-xs sm:text-sm font-semibold bg-slate-50 border border-charcoal-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-forest-700"
                    />
                    <Phone className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-black text-sm uppercase tracking-wider shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-gold-accent" />
                  <span>Publishing to Marketplace...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-gold-accent" />
                  <span>Publish Verified Property Listing (100% Free)</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
