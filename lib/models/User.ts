import mongoose, { Document, Schema, Model, models } from "mongoose";

export interface IUser extends Document {
  password: string;
  email: string;
}

const UserSchema: Schema<IUser> = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const User: Model<IUser> =
  models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
