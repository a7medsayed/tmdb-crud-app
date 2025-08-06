import { Controller, Post, UseGuards } from "@nestjs/common";
import { SuccessResponse } from "../../../responses/success-response.service";
import { AdminService } from "./movie-admin.service";
import { AdminJwtAuthGuard } from "src/modules/admin-user/auth/jwt-admin.guard";

@Controller("admin/movies")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AdminJwtAuthGuard)
  @Post("sync")
  async syncMovies() {
    const result = await this.adminService.syncMovies();
    return new SuccessResponse(result);
  }
}
