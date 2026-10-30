/**
 * Enterprise Transactional Email Service for EstateOS
 * Powered by Resend REST API with fail-safe simulated delivery fallback.
 */

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; mode: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = payload.from || process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'concierge@estateos.in';

  if (apiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `EstateOS Support <${fromAddress}>`,
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, messageId: data.id, mode: 'live_resend' };
      } else {
        console.warn('Resend API returned non-200:', await res.text());
      }
    } catch (err) {
      console.warn('Error dispatching email via Resend API:', err);
    }
  }

  // Resilient fallback (safe in development & test environments)
  const simId = `sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  console.log(`[Simulated Email Dispatch] To: ${payload.to} | Subject: "${payload.subject}" | ID: ${simId}`);
  return { success: true, messageId: simId, mode: 'simulated' };
}

export async function sendContactInquiryConfirmation({
  toEmail,
  name,
  ticketId,
  subject,
}: {
  toEmail: string;
  name: string;
  ticketId: string;
  subject: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden;">
        <div style="background: #0f2e1e; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px;">Estate<span style="color: #d4af37;">OS</span> Intelligence</h2>
          <p style="color: #94a3b8; font-size: 11px; margin-top: 4px;">India's Sovereign RERA-Audited PropTech Platform</p>
        </div>
        <div style="padding: 24px; color: #334155; font-size: 13px; line-height: 1.6;">
          <p>Dear <strong>${name}</strong>,</p>
          <p>We have acknowledged and logged your inquiry: <strong>"${subject}"</strong>.</p>
          <div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px; margin: 16px 0;">
            Tracking Ticket ID: <strong>${ticketId}</strong>
          </div>
          <p>Our centralized compliance desk and assigned consultant will connect with you within 24 business hours.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 11px; color: #64748b; margin: 0;">EstateOS Technologies Pvt. Ltd. • All inquiries are logged under statutory consumer compliance.</p>
        </div>
      </div>
    </div>
  `;

  return sendEmail({
    to: toEmail,
    subject: `[EstateOS] Inquiry Acknowledged — Ticket ${ticketId}`,
    html,
  });
}

export async function sendPropertyEnquiryConfirmation({
  toEmail,
  buyerName,
  propertyTitle,
  priceFormatted,
}: {
  toEmail: string;
  buyerName: string;
  propertyTitle: string;
  priceFormatted: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden;">
        <div style="background: #0f2e1e; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px;">Estate<span style="color: #d4af37;">OS</span> Concierge</h2>
          <p style="color: #94a3b8; font-size: 11px; margin-top: 4px;">Verified Direct Lead Routing</p>
        </div>
        <div style="padding: 24px; color: #334155; font-size: 13px; line-height: 1.6;">
          <p>Hi <strong>${buyerName}</strong>,</p>
          <p>Thank you for expressing interest in <strong>${propertyTitle}</strong> (${priceFormatted}).</p>
          <p>Your inquiry has been dispatched to the authorized RERA-certified representative for this property. They will share the sanctioned layout plans, RERA registration certificate, and schedule your private site walkthrough.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 11px; color: #64748b; margin: 0;">EstateOS Concierge Cell • 100% Verified Due-Diligence Gateway</p>
        </div>
      </div>
    </div>
  `;

  return sendEmail({
    to: toEmail,
    subject: `[EstateOS] Property Inquiry Dispatched — ${propertyTitle}`,
    html,
  });
}
