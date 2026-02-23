'use server';
import { Resend } from 'resend';

// استدعاء المفتاح من ملف الـ .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletter(emails: string[], title: string, content: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Best Dar <newsletter@bestdar.com>', // البريد الرسمي الموثق
      to: emails,
      subject: title,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #12AD65;">${title}</h1>
          <div style="line-height: 1.6; color: #333;">${content}</div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">You received this email because you subscribed to Best Dar newsletter.</p>
        </div>
      `,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}