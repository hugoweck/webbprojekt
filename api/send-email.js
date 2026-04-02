/**
 * /api/send-email
 * Enkel email-relay via Resend — använder gemensam sendEmail från lib/email.js
 */

const { sendEmail } = require('./lib/email');

module.exports = async (req, res) => {
  const allowedOrigins = ['https://weckmedia.com', 'https://www.weckmedia.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const secret = process.env.SEND_EMAIL_SECRET;
  if (!secret || req.headers['x-api-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { to, subject, message, html } = req.body;
  if (!to || !subject) return res.status(400).json({ error: 'to och subject krävs' });

  try {
    await sendEmail(to, subject, html || message || '');
    return res.json({ success: true, to, subject });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
