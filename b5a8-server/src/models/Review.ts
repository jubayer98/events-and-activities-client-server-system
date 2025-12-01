import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  host: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'User is required'],
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'Host is required'],
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'events',
      required: [true, 'Event is required'],
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'bookings',
      required: [true, 'Booking is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, 'Comment cannot exceed 500 characters'],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create a unique index to prevent duplicate reviews (one review per user per event)
reviewSchema.index({ user: 1, event: 1 }, { unique: true });

// Index for efficient host rating queries
reviewSchema.index({ host: 1 });

// Ensure virtuals are included when converting to JSON
reviewSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete (ret as any).__v;
    return ret;
  },
});

reviewSchema.set('toObject', {
  virtuals: true,
});

export const Review = mongoose.model<IReview>('reviews', reviewSchema);
