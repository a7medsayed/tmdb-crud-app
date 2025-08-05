import { Controller, Get } from "@nestjs/common";
import { SuccessResponse } from "../../../../responses/success-response.service";
import { TmdbService } from "../service/tmdb.service";

@Controller("third-party-integration/tmdb/movies")
export class TmdbIntegrationController {
  constructor(private unifonicService: TmdbService) {}

  @Get("list")
  async sendWhatsappMsg() {
    const response = await this.unifonicService.listMovies(1);
    return new SuccessResponse(response);
  }
}
