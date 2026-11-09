const token = '9245783228:AAHft7a7bdoWmsdwe46AaDeAOWAKxO5Hu0E';
const chatId = '1967853149';

const message = `💰 *NEW ESTATEOS HOME LOAN LEAD!*
━━━━━━━━━━━━━━━━━━
👤 *Applicant:* Ashu
📞 *Mobile:* \`8445715208\`
💵 *Loan Amount:* ₹17,60,000
🏦 *Preferred Bank:* State Bank of India
🏡 *Property:* Uday City & Abhay Green City, Shamli
🎯 *Est. DSA Commission:* ₹10,560
━━━━━━━━━━━━━━━━━━
📲 [Quick WhatsApp Buyer](https://wa.me/918445715208)
📞 Quick Call: tel:8445715208`;

fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: chatId,
    text: message,
    parse_mode: 'Markdown',
  }),
})
  .then((r) => r.json())
  .then((res) => console.log('Live Alert Result:', res));
