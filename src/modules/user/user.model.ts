import { Schema, model } from "mongoose";
import { Role } from "./utils/enums/user.enum";
import { IUser } from "./utils/types/user.types";


const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  state: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    sparse: true
  },

  password: {
    type: String,
    required: true
  },

  profileImage: {
    type: String,
  },
  //   userType: {
  //     type: String,
  //     // required: true,
  //     enum: Object.values(UserType),
  //   },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.LANDLORD
  },

  isEmailVerified: {
    type: Boolean,
    default: false
  },

  isProfileCompleted: {
    type: Boolean,
    default: false
  },

  // isPhoneNumberVerified: {
  //   type: Boolean,
  //   default: false
  // },

  verificationToken: {
    type: String
  },

  tenants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tenants'
    }
  ],

  house: {
    type: Schema.Types.ObjectId,
    ref: 'House'
  },

  passwordResetToken: {
    type: String,
    select: false,
  },

  passwordResetExpires: {
    type: Date,
    select: false,
  },

  passwordResetRetries: {
    type: Number,
    default: 0,
    select: false,
  },

  passwordChangedAt: {
    type: Date,
    select: false,
  },
}, {
  timestamps: true
})

export default model<IUser>('User', UserSchema)