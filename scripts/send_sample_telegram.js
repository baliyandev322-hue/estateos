const path = require('path');
const fs = require('fs');

/**
 * Load environment variables securely from .env if present.
 * Uses native process.loadEnvFile in modern Node.js with resilient fallback.
 */
function loadEnv() {
  const envPaths = [
    path.resolve(__dirname, '../.env'),
    path.resolve(__dirname, '.env'),
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'estateos/.env')
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      try {
        if (typeof process.loadEnvFile === 'function') {
          process.loadEnvFile(envPath);
          return;
        } else {
          const content = fs.readFileSync(envPath, 'utf8');
          content.split(/\r?\n/).forEach((line) => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx !== -1) {
              const key = trimmed.slice(0, eqIdx).trim();
              let val = trimmed.slice(eqIdx + 1).trim();
              if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
              }
              if (!process.env[key]) {
                process.env[key] = val;
              }
            }
          });
          return;
        }
      } catch (e) {
        // Continue if parse fails
      }
    }
  }
}

loadEnv();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!token || !chatId) {
  console.error('\n❌ ERROR: Missing Telegram credentials in environment.');
  console.error('Please configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your .env file or environment variables.');
  console.error('Example:');
  console.error('  TELEGRAM_BOT_TOKEN="your_bot_token"');
  console.error('  TELEGRAM_CHAT_ID="your_chat_id"\n');
  process.exit(1);
}

// Dummy demonstration data (NO real customer PII or financial details)
const sampleApplicant = 'Sample Applicant';
const sampleMobile = '9876543210';
const sampleAmount = '₹25,00,000';
const sampleBank = 'Sample National Bank';
const sampleProperty = 'Greenfield Heights, Sector 12';
const sampleCommission = '₹15,000';

const message = `💰 *NEW ESTATEOS HOME LOAN LEAD!*
━━━━━━━━━━━━━━━━━━
👤 *Applicant:* ${sampleApplicant}
📞 *Mobile:* \`${sampleMobile}\`
💵 *Loan Amount:* ${sampleAmount}
🏦 *Preferred Bank:* ${sampleBank}
🏡 *Property:* ${sampleProperty}
🎯 *Est. DSA Commission:* ${sampleCommission}
━━━━━━━━━━━━━━━━━━
📲 [Quick WhatsApp Buyer](https://wa.me/91${sampleMobile})
📞 Quick Call: tel:${sampleMobile}`;

async function sendSampleAlert() {
  console.log('Sending sample Telegram notification...');
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await res.json();
    if (res.ok && result.ok) {
      console.log('✅ Sample Alert dispatched successfully!');
      console.log('Message ID:', result.result?.message_id);
    } else {
      console.warn('⚠️ Telegram API returned an error:', result.description || 'Unknown error');
    }
  } catch (err) {
    const sanitizedError = (err?.message || 'Network error').replace(/bot[0-9]+:[a-zA-Z0-9_-]+/g, 'bot[REDACTED]');
    console.error('❌ Failed to dispatch Telegram alert:', sanitizedError);
  }
}

sendSampleAlert();
