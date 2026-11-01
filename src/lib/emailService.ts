/**
 * Enterprise Transactional Email Service for EstateOS
 * Supports:
 * 1. Resend REST API (if RESEND_API_KEY is configured)
 * 2. Nodemailer SMTP (Gmail / Hostinger Titan / Custom SMTP)
 * 3. Fail-safe simulated logging for local/test runs
 */

import nodemailer from 'nodemailer';

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'baliyandev322@gmail.com';

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; mode: string }> {
  const fromAddress = payload.from || process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'notifications@estateospro.in';

  // 1. Check for Resend API Key
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `EstateOS Alerts <${fromAddress}>`,
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, messageId: data.id, mode: 'resend_api' };
      } else {
        console.warn('Resend API error:', await res.text());
      }
    } catch (err) {
      console.warn('Resend dispatch failed, attempting SMTP fallback:', err);
    }
  }

  // 2. Check for SMTP credentials (Gmail, Hostinger, Custom SMTP)
  const smtpHost = process.env.SMTP_HOST || (process.env.GMAIL_USER ? 'smtp.gmail.com' : undefined);
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASS;
  const smtpPort = parseInt(process.env.SMTP_PORT || '465');

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"EstateOS Platform" <${smtpUser}>`,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      });

      return { success: true, messageId: info.messageId, mode: 'smtp' };
    } catch (smtpErr) {
      console.warn('SMTP dispatch error:', smtpErr);
    }
  }

  // 3. Fallback: Simulated mode for local development/test
  const simId = `sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  console.log(`[Simulated Email Dispatch] To: ${payload.to} | Subject: "${payload.subject}" | ID: ${simId}`);
  return { success: true, messageId: simId, mode: 'simulated' };
}

/**
 * Dispatch real-time Priority Lead Alert directly to the Platform Owner / Admin
 */
export async function sendAdminLeadAlert({
  leadType,
  name,
  phone,
  email,
  details,
  message,
}: {
  leadType: 'PROPERTY_ENQUIRY' | 'CONTACT_FORM' | 'HOME_LOAN_APPLICATION';
  name: string;
  phone: string;
  email?: string;
  details?: Record<string, any>;
  message?: string;
}) {
  const typeLabel =
    leadType === 'PROPERTY_ENQUIRY'
      ? '🏠 Property Lead'
      : leadType === 'HOME_LOAN_APPLICATION'
      ? '💰 Home Loan Lead'
      : '📩 Contact Inquiry';

  const detailsHtml = details
    ? Object.entries(details)
        .map(([k, v]) => `<tr><td style="padding: 6px 12px; font-weight: bold; color: #475569;">${k}:</td><td style="padding: 6px 12px; color: #0f172a;">${v}</td></tr>`)
        .join('')
    : '';

  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f1f5f9; padding: 24px;">
      <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #cbd5e1; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: #0f2e1e; padding: 20px 24px; color: #ffffff;">
          <span style="background: #d4af37; color: #0f2e1e; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 4px; text-transform: uppercase;">Real-Time Notification</span>
          <h2 style="margin: 8px 0 0; font-size: 20px; color: #ffffff;">${typeLabel}: New Customer Alert</h2>
        </div>
        
        <div style="padding: 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
          <p style="margin-top: 0;">A prospective client just submitted an inquiry on <strong>EstateOS</strong>:</p>

          <table style="width: 100%; border-collapse: collapse; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #475569; width: 35%;">Client Name:</td>
              <td style="padding: 8px 12px; font-weight: 800; color: #0f172a; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #475569;">Mobile Number:</td>
              <td style="padding: 8px 12px;">
                <a href="tel:${phone.replace(/\s+/g, '')}" style="color: #047857; font-weight: 800; text-decoration: none; font-size: 16px;">${phone}</a>
                &nbsp;•&nbsp;
                <a href="https://wa.me/91${phone.replace(/\D/g, '').slice(-10)}" style="color: #059669; font-weight: bold; text-decoration: underline;" target="_blank">Chat on WhatsApp</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #475569;">Email Address:</td>
              <td style="padding: 8px 12px; color: #0f172a;">${email || 'N/A'}</td>
            </tr>
            ${detailsHtml}
            ${
              message
                ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #475569; vertical-align: top;">Client Note:</td><td style="padding: 8px 12px; color: #334155; font-style: italic;">"${message}"</td></tr>`
                : ''
            }
          </table>

          <div style="text-align: center; margin-top: 24px;">
            <a href="tel:${phone.replace(/\s+/g, '')}" style="display: inline-block; background: #0f2e1e; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              📞 Call Client Now
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px;" />
          <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
            EstateOS PropTech Intelligence • Automated Lead Dispatch Gateway
          </p>
        </div>
      </div>
    </div>
  `;

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `🚨 [Lead Alert] ${name} (${phone}) - ${typeLabel}`,
    html,
  });
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
