import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import * as bodyParser from 'body-parser';

@Injectable()
export class BodyParserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    bodyParser.json({ limit: '300mb' })(req, null, () => {});
    bodyParser.urlencoded({ limit: '300mb', extended: true })(
      req,
      null,
      () => {},
    );
    return next.handle();
  }
}
