import { Schema, model, Document, Model, Types } from 'mongoose';

export type ActivityType =
  | 'APPLICATION_RECEIVED'
  | 'STATUS_CHANGED'
  | 'INTERVIEW_SCHEDULED'
  | 'FEEDBACK_SUBMITTED'
  | 'OFFER_SENT'
  | 'OFFER_ACCEPTED'
  | 'JOB_POSTED'
  | 'TEAM_MEMBER_INVITED';

export interface IEmployerActivity extends Document {
  _id: Types.ObjectId;
  employer: Types.ObjectId;
  company?: Types.ObjectId;
  type: ActivityType;
  title: string;
  description: string;
  metadata: Record<string, unknown>;
  isRead: boolean;
  createdAt: Date;
}

const employerActivitySchema = new Schema<IEmployerActivity>(
  {
    employer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      index: true,
    },
    type: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

employerActivitySchema.index({ employer: 1, createdAt: -1 });

export const EmployerActivity: Model<IEmployerActivity> = model<IEmployerActivity>(
  'EmployerActivity',
  employerActivitySchema
);
