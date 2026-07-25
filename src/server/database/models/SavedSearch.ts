import { Schema, model, Document, Model, Types } from 'mongoose';

export interface ISavedSearch extends Document {
  _id: Types.ObjectId;
  employer: Types.ObjectId;
  title: string;
  filters: Record<string, unknown>;
  createdAt: Date;
}

const savedSearchSchema = new Schema<ISavedSearch>(
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
    filters: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const SavedSearch: Model<ISavedSearch> = model<ISavedSearch>('SavedSearch', savedSearchSchema);
