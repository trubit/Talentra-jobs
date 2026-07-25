import { Schema, model, Document, Model, Types } from 'mongoose';

export interface IOrganization extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  owner: Types.ObjectId;
  companies: Types.ObjectId[];
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    companies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Company',
      },
    ],
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Organization: Model<IOrganization> = model<IOrganization>('Organization', organizationSchema);
