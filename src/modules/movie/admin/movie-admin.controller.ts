import { Controller, Post } from "@nestjs/common";
import { SuccessResponse } from "../../../responses/success-response.service";
import { AdminService } from "./movie-admin.service";

@Controller("admin/movies")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("sync")
  async syncMovies() {
    const result = await this.adminService.syncMovies();
    return new SuccessResponse(result);
  }
}
