import { Schema, model, Document, Model, Types } from 'mongoose';

export interface IDepartment extends Document {
  _id: Types.ObjectId;
  employer: Types.ObjectId;
  name: string;
  code?: string;
  description?: string;
  isArchived: boolean;
  createdAt: Date;
}

const departmentSchema = new Schema<IDepartment>(
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
    code: {
      type: String,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

departmentSchema.index({ employer: 1, name: 1 }, { unique: true });

export const Department: Model<IDepartment> = model<IDepartment>('Department', departmentSchema);
