import { Schema, model, Document, Model, Types } from 'mongoose';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface IRecruiterTask extends Document {
  _id: Types.ObjectId;
  employer: Types.ObjectId;
  assignedTo: Types.ObjectId;
  application?: Types.ObjectId;
  job?: Types.ObjectId;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

const recruiterTaskSchema = new Schema<IRecruiterTask>(
  {
    employer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'JobApplication',
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    dueDate: Date,
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

recruiterTaskSchema.index({ assignedTo: 1, status: 1 });

export const RecruiterTask: Model<IRecruiterTask> = model<IRecruiterTask>('RecruiterTask', recruiterTaskSchema);
