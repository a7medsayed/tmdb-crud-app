import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { User } from "../schema/user.schema";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(userData: Partial<User>): Promise<User> {
    return this.userRepository.create(userData);
  }
}
