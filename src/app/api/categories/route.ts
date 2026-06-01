import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Category } from '@/lib/models';
import { getGridFSBucket } from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;

    if (!file || !name) {
      return NextResponse.json({ success: false, error: "Missing file or name" }, { status: 400 });
    }

    const bucket = await getGridFSBucket();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadStream = bucket.openUploadStream(file.name, {
      contentType: file.type
    } as any);

    uploadStream.end(buffer);

    return new Promise<Response>((resolve) => {
      uploadStream.on('finish', async () => {
        try {
          const category = await Category.create({
            name,
            gridFsId: uploadStream.id
          });
          resolve(NextResponse.json({ success: true, category }));
        } catch (dbError) {
          console.error(dbError);
          resolve(NextResponse.json({ success: false, error: "Failed to save category metadata" }, { status: 500 }));
        }
      });
      uploadStream.on('error', (err) => {
        console.error(err);
        resolve(NextResponse.json({ success: false, error: "File upload failed" }, { status: 500 }));
      });
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to create category" }, { status: 500 });
  }
}
