import { Module } from "@nestjs/common";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { UserRepository } from "./repository/user.repository";
import { User, USER_COLLECTION_NAME, UserSchema } from "./schema/user.schema";
import { Connection } from "mongoose";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: USER_COLLECTION_NAME,
        useFactory: async (nativeMongooseConnection: Connection) => {
          const schema = UserSchema;
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
