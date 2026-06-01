import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Inquiry } from '@/lib/models';

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const inquiry = await Inquiry.create(data);
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
