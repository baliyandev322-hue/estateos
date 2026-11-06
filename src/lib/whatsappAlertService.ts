/**
 * Real-Time WhatsApp Lead Alert Service for EstateOS Founder
 * Dispatches instant push notifications directly to the Founder's personal WhatsApp
 * via CallMeBot WhatsApp Gateway.
 */

const FOUNDER_WHATSAPP = process.env.FOUNDER_NOTIFICATION_WHATSAPP || '919368593249';
const CALLMEBOT_API_KEY = process.env.CALLMEBOT_API_KEY || '';

export interface LeadAlertDetails {
  leadType: 'HOME_LOAN' | 'PROPERTY_INQUIRY' | 'CONTACT_FORM';
  applicantName: string;
  phone: string;
  amount?: string | number;
  bank?: string;
  propertyTitle?: string;
  commission?: string | number;
  message?: string;
}

export async function sendWhatsAppAdminAlert(details: LeadAlertDetails): Promise<{ success: boolean; error?: string }> {
  try {
    const cleanPhone = details.phone.replace(/\D/g, '').slice(-10);
    const typeHeading =
      details.leadType === 'HOME_LOAN'
        ? '💰 *NEW ESTATEOS HOME LOAN LEAD!*'
        : details.leadType === 'PROPERTY_INQUIRY'
        ? '🏠 *NEW PROPERTY BUYER INQUIRY!*'
        : '📩 *NEW ESTATEOS CONTACT INQUIRY!*';

    const lines: string[] = [
      typeHeading,
      '━━━━━━━━━━━━━━━━━━',
      `👤 *Name:* ${details.applicantName}`,
      `📞 *Mobile:* ${details.phone}`,
    ];

    if (details.amount) {
      lines.push(`💵 *Amount:* ${typeof details.amount === 'number' ? `₹${details.amount.toLocaleString('en-IN')}` : details.amount}`);
    }

    if (details.bank) {
      lines.push(`🏦 *Preferred Bank:* ${details.bank}`);
    }

    if (details.propertyTitle) {
      lines.push(`🏡 *Property:* ${details.propertyTitle}`);
    }

    if (details.commission) {
      lines.push(`🎯 *Est. Commission:* ${typeof details.commission === 'number' ? `₹${Math.round(details.commission).toLocaleString('en-IN')}` : details.commission}`);
    }

    if (details.message) {
      lines.push(`💬 *Note:* "${details.message}"`);
    }

    lines.push('━━━━━━━━━━━━━━━━━━');
    lines.push(`📲 *Quick WhatsApp Buyer:* https://wa.me/91${cleanPhone}`);
    lines.push(`📞 *Quick Call:* tel:${cleanPhone}`);

    const payloadText = lines.join('\n');

    if (!CALLMEBOT_API_KEY) {
      console.warn('[WhatsApp Alert] CALLMEBOT_API_KEY not configured. Message ready for dispatch:\n', payloadText);
      return { success: false, error: 'CALLMEBOT_API_KEY not set' };
    }

    const apiUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
      FOUNDER_WHATSAPP
    )}&text=${encodeURIComponent(payloadText)}&apikey=${encodeURIComponent(CALLMEBOT_API_KEY)}`;

    const response = await fetch(apiUrl, { method: 'GET' });
    if (response.ok) {
      console.log(`[WhatsApp Alert] Dispatched successfully to +${FOUNDER_WHATSAPP}`);
      return { success: true };
    } else {
      const respText = await response.text();
      console.warn('[WhatsApp Alert] CallMeBot API non-200 response:', respText);
      return { success: false, error: respText };
    }
  } catch (err: any) {
    console.error('[WhatsApp Alert] Dispatch failed:', err);
    return { success: false, error: err.message };
  }
}
