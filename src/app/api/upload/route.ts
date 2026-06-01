import { NextResponse } from 'next/server';
import { getGridFSBucket } from '@/lib/db';
import { Photo } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;

    if (!file || !category) {
      return NextResponse.json({ success: false, error: "Missing file or category" }, { status: 400 });
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
          const photo = await Photo.create({
            category,
            gridFsId: uploadStream.id
          });
          resolve(NextResponse.json({ success: true, photo }));
        } catch (e) {
          resolve(NextResponse.json({ success: false, error: "Failed to save metadata" }, { status: 500 }));
        }
      });
      uploadStream.on('error', (error) => {
        console.error("GridFS error:", error);
        resolve(NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 }));
      });
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 500 });
  }
}
