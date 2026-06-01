import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  company: string;
  email: string;
  phone: string;
  requirements: string;
  createdAt: Date;
}

const InquirySchema: Schema = new Schema({
  name: { type: String, required: true },
  company: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  requirements: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Inquiry = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export interface ICategory extends Document {
  name: string;
  gridFsId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  gridFsId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now }
});

export interface IPhoto extends Document {
  category: string;
  name?: string;
  gridFsId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const PhotoSchema: Schema = new Schema({
  category: { type: String, required: true },
  name: { type: String, default: "" },
  gridFsId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now }
});

if (process.env.NODE_ENV !== 'production') {
  delete mongoose.models.Category;
  delete mongoose.models.Photo;
}
export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
export const Photo = mongoose.models.Photo || mongoose.model<IPhoto>('Photo', PhotoSchema);
