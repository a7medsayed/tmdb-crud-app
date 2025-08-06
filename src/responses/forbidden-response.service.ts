import { HttpStatus, Injectable } from "@nestjs/common";
import { ResponseModel } from "./response";
import { ResponseErrors } from "./constants";

@Injectable()
export class ForbiddenResponse extends ResponseModel<any> {
  constructor(feedback?: any) {
    super(
      HttpStatus.FORBIDDEN,
      false,
      ResponseErrors.FORBIDDEN,
      null,
      feedback
    );
  }
}
