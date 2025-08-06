import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../schema/user.schema";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: Partial<User>): Promise<UserDocument> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findOne(filter: object): Promise<UserDocument | null> {
    return this.userModel.findOne(filter).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateOne(
    id: string,
    updateData: Partial<User>
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }
}
