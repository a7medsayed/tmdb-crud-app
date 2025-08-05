import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseModel } from './response';
import { ResponseErrors } from './constants';

@Injectable()
export class TooManyRequestsResponse extends ResponseModel<any> {
  constructor(feedback?: any) {
    super(
      HttpStatus.TOO_MANY_REQUESTS,
      false,
      ResponseErrors.TOO_MANY_REQUESTS,
      null,
      feedback,
    );
  }
}
