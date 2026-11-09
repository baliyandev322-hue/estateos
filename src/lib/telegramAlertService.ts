/**
 * Real-Time Telegram Push Alert Gateway for EstateOS Founder
 * Dispatches instant push notifications directly to the Founder's mobile phone
 * with sound/chime via Telegram Bot API (100% Free, Unlimited & Instant).
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

export interface TelegramLeadAlert {
  leadType: 'HOME_LOAN' | 'PROPERTY_INQUIRY' | 'CONTACT_FORM';
  applicantName: string;
  phone: string;
  amount?: string | number;
  bank?: string;
  propertyTitle?: string;
  commission?: string | number;
  message?: string;
}

export async function sendTelegramAdminAlert(details: TelegramLeadAlert): Promise<{ success: boolean; error?: string }> {
  try {
    const cleanPhone = details.phone.replace(/\D/g, '').slice(-10);
    const typeHeading =
      details.leadType === 'HOME_LOAN'
        ? '💰 *NEW ESTATEOS HOME LOAN LEAD!*'
        : details.leadType === 'PROPERTY_INQUIRY'
        ? '🏠 *NEW PROPERTY BUYER INQUIRY!*'
        : '📩 *NEW CONTACT INQUIRY!*';

    const lines: string[] = [
      typeHeading,
      '━━━━━━━━━━━━━━━━━━',
      `👤 *Name:* ${details.applicantName}`,
      `📞 *Mobile:* \`${details.phone}\``,
    ];

    if (details.amount) {
      lines.push(`💵 *Amount:* ${typeof details.amount === 'number' ? `₹${details.amount.toLocaleString('en-IN')}` : details.amount}`);
    }

    if (details.bank) {
      lines.push(`🏦 *Bank:* ${details.bank}`);
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
    lines.push(`📲 [Quick WhatsApp Buyer](https://wa.me/91${cleanPhone})`);
    lines.push(`📞 Quick Call: tel:${cleanPhone}`);

    const payloadText = lines.join('\n');

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('[Telegram Alert] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured. Message ready for dispatch:\n', payloadText);
      return { success: false, error: 'Telegram credentials not set' };
    }

    const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: payloadText,
        parse_mode: 'Markdown',
      }),
    });

    if (res.ok) {
      console.log('[Telegram Alert] Dispatched successfully to Founder phone!');
      return { success: true };
    } else {
      const errText = await res.text();
      console.warn('[Telegram Alert] API error:', errText);
      return { success: false, error: errText };
    }
  } catch (err: any) {
    console.error('[Telegram Alert] Exception:', err);
    return { success: false, error: err.message };
  }
}
