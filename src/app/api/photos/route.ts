import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Photo } from '@/lib/models';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category && category !== 'ALL') {
      query = { category };
    }

    const photos = await Photo.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, photos });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch photos" }, { status: 500 });
  }
}
