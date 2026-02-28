import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        // Pastikan environment variables sudah diisi
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('EMAIL_USER or EMAIL_PASS not set in .env.local');
            return NextResponse.json({ error: 'Server email configuration is missing' }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Gunakan App Password Gmail, bukan password akun biasa
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Gmail biasanya mengharuskan 'from' sama dengan user auth
            to: 'andurila19@gmail.com',
            replyTo: email,
            subject: `[Anduril Blog] ${subject}`,
            text: `Pesan Baru dari: ${name}\nEmail: ${email}\n\nIsi Pesan:\n${message}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
          <h2 style="color: #3b82f6;">Pesan Kontak Baru</h2>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subjek:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Pesan:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        console.error('Nodemailer Error:', error);
        return NextResponse.json({ error: 'Gagal mengirim email: ' + error.message }, { status: 500 });
    }
}
