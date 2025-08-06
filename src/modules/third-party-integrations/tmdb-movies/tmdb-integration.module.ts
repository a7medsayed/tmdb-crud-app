import { Global, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TmdbService } from "./service/tmdb.service";
import { TmdbIntegrationController } from "./controller/tmdb.controllers";

@Global()
@Module({
  imports: [HttpModule],
  controllers: [TmdbIntegrationController],
  providers: [TmdbService],
  exports: [TmdbService],
})
export class TmdbIntegrationModule {}
