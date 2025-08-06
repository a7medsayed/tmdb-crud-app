import { Controller, Get } from "@nestjs/common";
import { SuccessResponse } from "./responses/success-response.service";

@Controller("")
export class AppController {
  constructor() {}

  @Get("")
  async CheckHealthy() {
    return new SuccessResponse({ data: "Healthy" });
  }
}
