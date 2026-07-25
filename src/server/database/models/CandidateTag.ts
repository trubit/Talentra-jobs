import { Schema, model, Document, Model, Types } from 'mongoose';

export interface ICandidateTag extends Document {
  _id: Types.ObjectId;
  employer: Types.ObjectId;
  name: string;
  color: string;
  createdAt: Date;
}

const candidateTagSchema = new Schema<ICandidateTag>(
  {
    employer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      default: '#3b82f6',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

candidateTagSchema.index({ employer: 1, name: 1 }, { unique: true });

export const CandidateTag: Model<ICandidateTag> = model<ICandidateTag>('CandidateTag', candidateTagSchema);
