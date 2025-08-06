import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdminUser, AdminUserDocument } from "../schema/admin-user.schema";

@Injectable()
export class AdminUserRepository {
  constructor(
    @InjectModel(AdminUser.name)
    private adminUserModel: Model<AdminUserDocument>
  ) {}

  async findByEmail(email: string) {
    return this.adminUserModel.findOne({ email });
  }

  async create(email: string, password: string) {
    return this.adminUserModel.create({ email, password });
  }
}
