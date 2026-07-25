import { Schema, model, Document, Model, Types } from 'mongoose';

export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'CANCELLED';

export interface ITeamInvitation extends Document {
  _id: Types.ObjectId;
  employer: Types.ObjectId;
  email: string;
  role: 'EMPLOYER' | 'ADMIN';
  department?: Types.ObjectId;
  token: string;
  status: InvitationStatus;
  expiresAt: Date;
  createdAt: Date;
}

const teamInvitationSchema = new Schema<ITeamInvitation>(
  {
    employer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['EMPLOYER', 'ADMIN'],
      default: 'EMPLOYER',
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CANCELLED'],
      default: 'PENDING',
      required: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const TeamInvitation: Model<ITeamInvitation> = model<ITeamInvitation>('TeamInvitation', teamInvitationSchema);
