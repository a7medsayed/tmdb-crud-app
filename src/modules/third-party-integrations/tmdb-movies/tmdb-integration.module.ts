import { Global, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TmdbService } from "./service/tmdb.service";

@Global()
@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [TmdbService],
  exports: [TmdbService],
})
export class TmdbIntegrationModule {}
