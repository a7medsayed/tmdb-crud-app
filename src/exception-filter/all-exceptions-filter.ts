import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { InternalServerErrorResponse } from '../responses/internal-server-error-response.service';
import { BadRequestResponse } from '../responses/bad-request-response.service';
import { ForbiddenResponse } from '../responses/forbidden-response.service';
import { UnAuthorizedResponse } from '../responses/un-authorized-response.service';
import { InvalidParamsResponse } from '../responses/invalid-params-response.service';
import { ErrorCodes } from '../constants/error-codes';
import { NotFoundResponse } from '../responses/not-found-response.service';
import { TooManyRequestsResponse } from '../responses/too-many-requests-response.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    console.log(
      new Date().toISOString(),
      '[Request Url]',
      httpAdapter.getRequestUrl(ctx.getRequest()),
      '[Exception]',
      exception,
    );

    let myRes = null;
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    switch (httpStatus) {
      case HttpStatus.BAD_REQUEST:
        if (exception instanceof HttpException) {
          myRes = new BadRequestResponse(exception.getResponse());
        } else {
          myRes = new BadRequestResponse();
        }
        httpAdapter.reply(
          ctx.getResponse(),
          myRes.getResponseObject(),
          httpStatus,
        );
        break;
      case HttpStatus.UNPROCESSABLE_ENTITY:
        if (exception instanceof HttpException) {
          myRes = new InvalidParamsResponse(exception.getResponse());
        } else {
          myRes = new InvalidParamsResponse();
        }
        httpAdapter.reply(
          ctx.getResponse(),
          myRes.getResponseObject(),
          httpStatus,
        );
        break;
      case HttpStatus.UNAUTHORIZED:
        if (exception instanceof HttpException) {
          myRes = new UnAuthorizedResponse(exception.getResponse());
        } else {
          myRes = new UnAuthorizedResponse();
        }
        httpAdapter.reply(
          ctx.getResponse(),
          myRes.getResponseObject(),
          httpStatus,
        );
        break;
      case HttpStatus.FORBIDDEN:
        if (exception instanceof HttpException) {
          myRes = new ForbiddenResponse(exception.getResponse());
        } else {
          myRes = new ForbiddenResponse();
        }
        httpAdapter.reply(
          ctx.getResponse(),
          myRes.getResponseObject(),
          httpStatus,
        );
        break;
      case HttpStatus.NOT_FOUND:
        if (exception instanceof HttpException) {
          myRes = new NotFoundResponse(exception.getResponse());
        } else {
          myRes = new NotFoundResponse();
        }
        httpAdapter.reply(
          ctx.getResponse(),
          myRes.getResponseObject(),
          httpStatus,
        );
        break;
      case HttpStatus.TOO_MANY_REQUESTS:
        if (exception instanceof HttpException) {
          myRes = new TooManyRequestsResponse(exception.getResponse());
        } else {
          myRes = new TooManyRequestsResponse();
        }
        httpAdapter.reply(
          ctx.getResponse(),
          myRes.getResponseObject(),
          httpStatus,
        );
        break;
      default:
        if (exception instanceof HttpException) {
          myRes = new InternalServerErrorResponse(exception.getResponse());
        } else {
          myRes = new InternalServerErrorResponse(ErrorCodes.UNEXPECTED_ERROR);
        }
        httpAdapter.reply(
          ctx.getResponse(),
          myRes.getResponseObject(),
          httpStatus,
        );
    }
  }
}
