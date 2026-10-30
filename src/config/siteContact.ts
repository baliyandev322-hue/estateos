/**
 * Centralized Business & Support Contact Configuration
 * All contact details across Navbar, Footer, Contact Page, Legal/Refund Policies,
 * and Schema.org metadata are resolved from this file and can be overridden via
 * environment variables without code modification.
 */

export interface ContactConfig {
  companyName: string;
  brandName: string;
  tollFree: string;
  directPhone: string;
  whatsappNumber: string;
  supportEmail: string;
  grievanceEmail: string;
  complianceEmail: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    fullFormatted: string;
  };
  operatingHours: string;
  grievanceOfficer: string;
}

export const SITE_CONTACT: ContactConfig = {
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'EstateOS Technologies Pvt. Ltd.',
  brandName: 'EstateOS',
  tollFree: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+91 1800 200 4567',
  directPhone: process.env.NEXT_PUBLIC_DIRECT_PHONE || '+91 98765 43210',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '919876543210',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@estateos.in',
  grievanceEmail: process.env.NEXT_PUBLIC_GRIEVANCE_EMAIL || 'grievance@estateos.in',
  complianceEmail: process.env.NEXT_PUBLIC_COMPLIANCE_EMAIL || 'compliance@estateos.in',
  address: {
    line1: 'Level 14, Horizon Cyber Tower',
    line2: 'Golf Course Extension Road, Sector 54',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122018',
    country: 'India',
    fullFormatted:
      process.env.NEXT_PUBLIC_OFFICE_ADDRESS ||
      'Level 14, Horizon Cyber Tower, Golf Course Extension Road, Sector 54, Gurugram, Haryana - 122018, India',
  },
  operatingHours: 'Mon - Sat, 9:00 AM - 7:00 PM IST',
  grievanceOfficer: 'Adv. K. Aggarwal (Statutory Nodal Officer)',
};

export default SITE_CONTACT;
