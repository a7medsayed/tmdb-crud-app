import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { TimeoutInterceptor } from './timeout-interceptor';

const SetTimeout = (timeout: number) => SetMetadata('request-timeout', timeout);

export function SetRequestTimeout(timeout = 600000) {
  return applyDecorators(
    SetTimeout(timeout),
    UseInterceptors(TimeoutInterceptor),
  );
}
