import { Schema, model } from "mongoose";
import { Role } from "./utils/enums/user.enum";
import { IUser } from "./utils/types/user.types";
import { boolean, required } from "joi";


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

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: Object.values(Role),
    required: true
  },

  isEmailVerified: {
    type: Boolean,
    default: false
  },

  // isProfileCompleted: {
  //   type: Boolean,
  //   default: false
  // },

  // isPhoneNumberVerified: {
  //   type: Boolean,
  //   default: false
  // },

  verificationToken: {
    type: String
  },

  verificationTokenExpires: {
    type: Date
  },

  isActive: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
})

export default model<IUser>('User', UserSchema)