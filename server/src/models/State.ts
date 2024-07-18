import mongoose, { Schema, Document } from "mongoose";

export interface IState extends Document {
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const StateSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
});

export default mongoose.model<IState>("State", StateSchema);
