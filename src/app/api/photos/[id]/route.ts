import { NextResponse } from 'next/server';
import { connectDB, getGridFSBucket } from '@/lib/db';
import { Photo } from '@/lib/models';
import mongoose from 'mongoose';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    
    const photo = await Photo.findById(id);
    if (!photo) {
      return NextResponse.json({ success: false, error: "Photo not found" }, { status: 404 });
    }

    const bucket = await getGridFSBucket();
    try {
      await bucket.delete(new mongoose.Types.ObjectId(photo.gridFsId));
    } catch (e) {
      console.error("GridFS delete error:", e);
      // Even if gridfs delete fails (maybe file missing), we should remove the metadata
    }

    await Photo.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to delete photo" }, { status: 500 });
  }
}
