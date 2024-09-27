import Mailgun from "mailgun.js";
import FormData from "form-data";
const API_KEY = process.env.MAILGUN_API_KEY || "";
const DOMAIN = process.env.MAILGUN_DOMAIN || "";


export async function sendForgotMail(to: string, subject: string, link: string) {
  const mailgun = new Mailgun(FormData);
  const client = mailgun.client({ username: "api", key: API_KEY });

  const messageBody = {
    from: " < mailgun@" + process.env.MAILGUN_DOMAIN! + ">",
    to,
    subject,
    html: ` 
    <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #007BFF;">Reset Your Password</h1>
    <p style="font-size: 16px;">Dear User,</p>
    <p style="font-size: 16px;">We received a request to reset your password. Click the link below to reset it:</p>
    <p style="font-size: 16px;"><a href="${link}" style="color: #007BFF; text-decoration: none; font-weight: bold;">Reset Password</a></p>
    <p style="font-size: 16px;">If you did not request a password reset, please ignore this email.</p>
    <p style="font-size: 16px;">Best regards,</p>
    <p style="font-size: 16px; font-weight: bold;">The ProductionGlue Team</p>
</div>

    `,
  };
  await client.messages.create(DOMAIN, messageBody);
}
