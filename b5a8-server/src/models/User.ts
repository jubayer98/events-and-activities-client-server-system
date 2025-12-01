import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: 'Male' | 'Female' | 'Third';
  role: 'admin' | 'user' | 'host';
  userStatus: boolean;
  roleChangeRequest?: 'host' | null;
  profileImage?: string;
  bio?: string;
  interests?: string[];
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  fullName: string;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Third'],
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'host'],
      default: 'user',
    },
    userStatus: {
      type: Boolean,
      default: false,
    },
    roleChangeRequest: {
      type: String,
      enum: ['host', null],
      default: null,
    },
    profileImage: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
      default: null,
    },
    interests: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual field for full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtuals are included when converting to JSON
userSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete (ret as any).__v;
    return ret;
  },
});

userSchema.set('toObject', {
  virtuals: true,
});

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const saltRounds = parseInt(process.env.JWT_SALT_ROUNDS || '10');
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('users', userSchema);
