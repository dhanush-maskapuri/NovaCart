const config = require('../config/env');
const logger = require('../utils/logger');

let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  nodemailer = null;
}

/**
 * Email Service Module using Nodemailer
 * Supports password reset emails, order confirmations, and notifications.
 */
class EmailService {
  /**
   * Check if SMTP is configured in environment variables
   */
  isConfigured() {
    return Boolean(
      config.smtp &&
      config.smtp.host &&
      config.smtp.user &&
      config.smtp.pass
    );
  }

  /**
   * Create Nodemailer Transporter instance
   */
  createTransporter() {
    if (!nodemailer) {
      throw new Error('Nodemailer package is not loaded');
    }

    return nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465, // true for 465, false for 587
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }

  /**
   * Send Password Reset Email with Token Link
   * @param {Object} options - { to, resetToken, resetUrl }
   */
  async sendPasswordResetEmail({ to, resetToken, resetUrl }) {
    if (!this.isConfigured()) {
      logger.warn(`SMTP is not configured. Reset link for ${to}: ${resetUrl}`);
      return {
        sent: false,
        smtpConfigured: false,
        message: 'SMTP email server is not configured in .env. Reset token generated successfully.',
        resetToken,
        resetUrl,
      };
    }

    try {
      const transporter = this.createTransporter();

      const mailOptions = {
        from: config.smtp.from,
        to,
        subject: 'NovaCart - Password Reset Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
            <h2 style="color: #4f46e5;">NovaCart Password Reset Request</h2>
            <p>You requested a password reset for your NovaCart account.</p>
            <p>Please click the button below to reset your password. This link is valid for 30 minutes:</p>
            <div style="margin: 25px 0;">
              <a href="${resetUrl}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            <p style="color: #64748b; font-size: 12px;">Or copy and paste this link into your browser:</p>
            <p style="color: #64748b; font-size: 12px; word-break: break-all;">${resetUrl}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #94a3b8; font-size: 11px;">If you did not request this email, please ignore it.</p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      logger.info(`Password reset email sent to ${to}: ${info.messageId}`);
      return {
        sent: true,
        smtpConfigured: true,
        messageId: info.messageId,
        message: 'Password reset email sent successfully.',
      };
    } catch (error) {
      logger.error(`Failed to send password reset email to ${to}:`, error);
      return {
        sent: false,
        smtpConfigured: true,
        error: error.message,
        message: `Email delivery failed via SMTP (${error.message}). Reset token generated successfully.`,
        resetToken,
        resetUrl,
      };
    }
  }
}

module.exports = new EmailService();
