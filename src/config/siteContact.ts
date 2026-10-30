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
  tollFree: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+91 93685 93249',
  directPhone: process.env.NEXT_PUBLIC_DIRECT_PHONE || '+91 93685 93249',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '919368593249',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@estateos.in',
  grievanceEmail: process.env.NEXT_PUBLIC_GRIEVANCE_EMAIL || 'grievance@estateos.in',
  complianceEmail: process.env.NEXT_PUBLIC_COMPLIANCE_EMAIL || 'compliance@estateos.in',
  address: {
    line1: 'Gali No. 10, Near Verma Park',
    line2: 'Gandhi Colony',
    city: 'Muzaffarnagar',
    state: 'Uttar Pradesh',
    pincode: '251001',
    country: 'India',
    fullFormatted:
      process.env.NEXT_PUBLIC_OFFICE_ADDRESS ||
      'Gali No. 10, Near Verma Park, Gandhi Colony, Muzaffarnagar, Uttar Pradesh - 251001, India',
  },
  operatingHours: 'Mon - Sat, 9:00 AM - 7:00 PM IST',
  grievanceOfficer: 'EstateOS Nodal Grievance Cell',
};

export default SITE_CONTACT;
