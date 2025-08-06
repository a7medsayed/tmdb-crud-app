import { Controller, Post, UseGuards } from "@nestjs/common";
import { SuccessResponse } from "../../../responses/success-response.service";
import { AdminService } from "./movie-admin.service";
import { AdminJwtAuthGuard } from "src/modules/admin-user/auth/jwt-admin.guard";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller("admin/movies")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @ApiTags("sync movies")
  @ApiOperation({ summary: "Sync Movies" })
  @Post("sync")
  async syncMovies() {
    const result = await this.adminService.syncMovies();
    return new SuccessResponse(result);
  }
}
