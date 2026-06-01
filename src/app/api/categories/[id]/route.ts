import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Category } from '@/lib/models';
import mongoose from 'mongoose';
import { getGridFSBucket } from '@/lib/db';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    const bucket = await getGridFSBucket();
    try {
      await bucket.delete(new mongoose.Types.ObjectId(category.gridFsId));
    } catch (e) {
      console.error("GridFS delete error:", e);
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to delete category" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    
    const body = await request.json();
    const { name } = body;

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: { ...(name && { name }) } },
      { new: true }
    );

    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to update category" }, { status: 500 });
  }
}
