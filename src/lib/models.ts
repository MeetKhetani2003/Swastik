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

export interface IPhoto extends Document {
  category: string;
  gridFsId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const PhotoSchema: Schema = new Schema({
  category: { 
    type: String, 
    required: true,
    enum: ['PEB and heavy', 'Our Infra', 'Process eq']
  },
  gridFsId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Photo = mongoose.models.Photo || mongoose.model<IPhoto>('Photo', PhotoSchema);
