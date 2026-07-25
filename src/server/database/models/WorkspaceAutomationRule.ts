import { Schema, model, Document, Model, Types } from 'mongoose';

export type AutomationTrigger = 'JOB_EXPIRED' | 'APPLICATION_RECEIVED' | 'TASK_OVERDUE' | 'STAGE_UNCHANGED';

export interface IWorkspaceAutomationRule extends Document {
  _id: Types.ObjectId;
  employer: Types.ObjectId;
  title: string;
  trigger: AutomationTrigger;
  action: string;
  isEnabled: boolean;
  config: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const workspaceAutomationRuleSchema = new Schema<IWorkspaceAutomationRule>(
  {
    employer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    trigger: {
      type: String,
      required: true,
      enum: ['JOB_EXPIRED', 'APPLICATION_RECEIVED', 'TASK_OVERDUE', 'STAGE_UNCHANGED'],
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    isEnabled: {
      type: Boolean,
      default: true,
      index: true,
    },
    config: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const WorkspaceAutomationRule: Model<IWorkspaceAutomationRule> = model<IWorkspaceAutomationRule>(
  'WorkspaceAutomationRule',
  workspaceAutomationRuleSchema
);
