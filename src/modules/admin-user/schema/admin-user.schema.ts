import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AdminUserDocument = AdminUser & Document;

@Schema({ collection: "AdminUser", timestamps: true })
export class AdminUser {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // hashed
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
