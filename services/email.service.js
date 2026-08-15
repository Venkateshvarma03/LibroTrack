const { Resend } = require('resend');
const config = require('../config/config');

const resend = config.resendApiKey ? new Resend(config.resendApiKey) : null;

async function sendWelcomeEmail(toEmail, username) {
  if (!resend) {
    console.log('Resend not configured — skipping welcome email');
    return;
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: toEmail,
      subject: 'Welcome to LibroTrack!',
      html: `<p>Hi ${username}, welcome to LibroTrack! Your account has been created successfully.</p>`,
    });
  } catch (err) {
    console.error('Failed to send welcome email:', err.message);
  }
}

module.exports = { sendWelcomeEmail };