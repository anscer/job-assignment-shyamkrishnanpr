import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import passportLocalMongoose from "passport-local-mongoose";

export interface IUser extends Document {
  username: string;
  // password: string;
  // comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model<IUser>("User", UserSchema);



