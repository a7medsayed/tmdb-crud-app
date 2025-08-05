import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { EnvironmentVariables } from "../../../../../env/env.configuration";
import { catchError, firstValueFrom, map } from "rxjs";
import { AxiosRequestConfig } from "axios";
import { PathUrl } from "../enum/tmdb.enum";
import { TMDBMovieResponse } from "../interface/list-movies-response.interface";

@Injectable()
export class TmdbService {
  private apiKey: string;
  private baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.apiKey = EnvironmentVariables().tmdb.apiKey;
    this.baseUrl = EnvironmentVariables().tmdb.baseUrl;
  }

  async listMovies(page: number): Promise<TMDBMovieResponse> {
    const pathUrl = PathUrl.listMovies;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const url = encodeURI(
      `${this.baseUrl}${pathUrl}?api_key=${this.apiKey}&page=${page}`
    );
    const httpPromiseResponse = this.httpService.get(url, requestConfig);
    return await firstValueFrom(
      httpPromiseResponse.pipe(
        map((response) => {
          return JSON.parse(JSON.stringify(response?.data));
        }),
        catchError((e) => {
          console.log(e.response);
          throw new HttpException(e?.response?.data, e?.response?.status);
        })
      )
    );
  }
}
