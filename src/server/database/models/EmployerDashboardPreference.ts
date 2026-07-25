import { Schema, model, Document, Model, Types } from 'mongoose';

export interface IEmployerDashboardPreference extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  selectedCompany?: Types.ObjectId;
  sidebarCollapsed: boolean;
  visibleWidgets: string[];
  widgetOrder: string[];
  compactMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const employerDashboardPreferenceSchema = new Schema<IEmployerDashboardPreference>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    selectedCompany: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
    sidebarCollapsed: {
      type: Boolean,
      default: false,
    },
    visibleWidgets: {
      type: [String],
      default: ['summary', 'quick_actions', 'activity', 'recent_jobs', 'recent_applications', 'recent_interviews'],
    },
    widgetOrder: {
      type: [String],
      default: ['summary', 'quick_actions', 'activity', 'recent_jobs', 'recent_applications', 'recent_interviews'],
    },
    compactMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const EmployerDashboardPreference: Model<IEmployerDashboardPreference> = model<IEmployerDashboardPreference>(
  'EmployerDashboardPreference',
  employerDashboardPreferenceSchema
);
