import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  type: 'Cultural' | 'Travel' | 'Sports' | 'Business' | 'Conference' | 'Workshop' | 'Family' | 'Exhibition' | 'Training' | 'Tour' | 'Food' | 'Networking';
  date: Date;
  time: string;
  location: string;
  requiredParticipant: {
    min: number;
    max: number;
  };
  currentParticipants: number;
  description?: string;
  image?: string;
  feeStatus: 'free' | 'paid';
  joiningFee: number;
  status: 'Open' | 'Full' | 'Cancelled' | 'Completed';
  approvalStatus: boolean;
  host: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Cultural', 'Travel', 'Sports', 'Business', 'Conference', 'Workshop', 'Family', 'Exhibition', 'Training', 'Tour', 'Food', 'Networking'],
      required: [true, 'Event type is required'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
    },
    requiredParticipant: {
      min: {
        type: Number,
        required: [true, 'Minimum participant count is required'],
        min: [1, 'Minimum participant must be at least 1'],
      },
      max: {
        type: Number,
        required: [true, 'Maximum participant count is required'],
        min: [1, 'Maximum participant must be at least 1'],
      },
    },
    currentParticipants: {
      type: Number,
      default: 0,
      min: [0, 'Current participants cannot be negative'],
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    feeStatus: {
      type: String,
      enum: ['free', 'paid'],
      required: [true, 'Fee status is required'],
    },
    joiningFee: {
      type: Number,
      default: 0,
      min: [0, 'Joining fee cannot be negative'],
    },
    status: {
      type: String,
      enum: ['Open', 'Full', 'Cancelled', 'Completed'],
      default: 'Open',
    },
    approvalStatus: {
      type: Boolean,
      default: false,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'Host is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Ensure virtuals are included when converting to JSON
eventSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete (ret as any).__v;
    return ret;
  },
});

eventSchema.set('toObject', {
  virtuals: true,
});

export const Event = mongoose.model<IEvent>('events', eventSchema);
