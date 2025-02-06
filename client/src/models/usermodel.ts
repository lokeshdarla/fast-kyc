import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  wallet_address: string;
  role: "CUSTOMER" | "BUSINESS";
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    wallet_address: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["CUSTOMER", "BUSINESS"],
      required: true,
    },
  },
  { timestamps: true } // Automatically manages createdAt & updatedAt
);

const UserModel: Model<IUser> =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
