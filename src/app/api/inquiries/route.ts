import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Inquiry } from '@/lib/models';

import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { captchaToken, ...inquiryData } = data;

    if (!captchaToken) {
      return NextResponse.json({ success: false, error: "Captcha token missing" }, { status: 400 });
    }

    // Verify Captcha
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return NextResponse.json({ success: false, error: "Captcha verification failed" }, { status: 400 });
    }

    await connectDB();
    const inquiry = await Inquiry.create(inquiryData);

    // Send Email via Nodemailer
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: `Swastik Website <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Inquiry from ${inquiryData.name} - Swastik Engineering`,
        text: `You have received a new inquiry via the Swastik Engineering website!

Details:
-----------------------------
Name: ${inquiryData.name}
Company: ${inquiryData.company || 'N/A'}
Email: ${inquiryData.email}
Phone: ${inquiryData.phone}
-----------------------------

Requirements:
${inquiryData.requirements || 'N/A'}
`
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // We don't fail the API request if email fails, as the DB entry succeeded
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to submit inquiry" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
