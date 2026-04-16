async function sendEmail(to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || 'Weck Media <noreply@weckmedia.se>',
      to,
      subject,
      html
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('Email error:', err);
    throw new Error(err.message || `Resend API error: ${res.status}`);
  }
  return await res.json().catch(() => ({}));
}

module.exports = { sendEmail };
