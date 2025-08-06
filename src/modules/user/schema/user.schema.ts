import { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export const USER_COLLECTION_NAME = "User";

export type UserDocument = User & Document;

@Schema({
  collection: USER_COLLECTION_NAME,
  autoIndex: true,
  timestamps: true,
})
export class User {
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Boolean, default: true })
  isActive?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 });
UserSchema.index({ isActive: 1 });
