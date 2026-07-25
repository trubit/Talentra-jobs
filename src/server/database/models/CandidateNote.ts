import { Schema, model, Document, Model, Types } from 'mongoose';

export interface ICandidateNote extends Document {
  _id: Types.ObjectId;
  application: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  mentions: Types.ObjectId[];
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const candidateNoteSchema = new Schema<ICandidateNote>(
  {
    application: {
      type: Schema.Types.ObjectId,
      ref: 'JobApplication',
      required: true,
      index: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
    mentions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isPrivate: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

candidateNoteSchema.index({ application: 1, createdAt: -1 });

export const CandidateNote: Model<ICandidateNote> = model<ICandidateNote>('CandidateNote', candidateNoteSchema);
