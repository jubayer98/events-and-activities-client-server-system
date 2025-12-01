import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  bookingStatus: boolean;
  paymentConfirmation: boolean;
  bookingExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'User is required'],
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'events',
      required: [true, 'Event is required'],
    },
    bookingStatus: {
      type: Boolean,
      default: true,
    },
    paymentConfirmation: {
      type: Boolean,
      default: false,
    },
    bookingExpiry: {
      type: Date,
      required: true,
      index: true, // Index for efficient expiry queries
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index to prevent duplicate bookings
bookingSchema.index({ user: 1, event: 1 }, { unique: true });

// Ensure virtuals are included when converting to JSON
bookingSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete (ret as any).__v;
    return ret;
  },
});

bookingSchema.set('toObject', {
  virtuals: true,
});

export const Booking = mongoose.model<IBooking>('bookings', bookingSchema);
