import { NextResponse } from 'next/server';
import { getGridFSBucket } from '@/lib/db';
import mongoose from 'mongoose';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const bucket = await getGridFSBucket();
    
    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(id);
    } catch {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const files = await bucket.find({ _id: objectId }).toArray();
    if (!files || files.length === 0) {
      return new NextResponse('Not found', { status: 404 });
    }

    const file = files[0];
    const stream = bucket.openDownloadStream(objectId);

    const webStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(new Uint8Array(chunk)));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      },
    });

    return new NextResponse(webStream, {
      headers: {
        'Content-Type': file.contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error("Image fetch error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
