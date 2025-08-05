import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentVariables } from '../env/env.configuration';
import { AppController } from './app.controller';
import { TmdbIntegrationModule } from './modules/third-party-integrations/tmdb-movies/tmdb-integration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [EnvironmentVariables],
    }),
    TmdbIntegrationModule,
  ],
  controllers: [AppController],
  providers: [
  ],
})
export class AppModule {}
