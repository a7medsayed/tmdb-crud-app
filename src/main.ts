import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./exception-filter/all-exceptions-filter";
import { ValidationError, ValidationPipe } from "@nestjs/common";
import { InvalidParamsException } from "./exception/invalid-params-exception";
import { ValidationErrorCodes } from "./constants/validation-error-codes";
import { EnvironmentVariables } from "../env/env.configuration";
import { ErrorCodes } from "./constants/error-codes";
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.getHttpAdapter().getInstance().set('etag', false);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return ValidationErrorsFormat(errors);
      },
    })
  );
  /**
   * Cors
   */
  app.enableCors();

  await app.listen(EnvironmentVariables().port);
}

bootstrap();

/**
 * Parse the validation error to our format
 * @param errors
 * @constructor
 */
function ValidationErrorsFormat(
  validationErrors: ValidationError[]
): InvalidParamsException {
  console.log("ValidationErrors", JSON.stringify(validationErrors));
  console.log("ValidationErrors", validationErrors);

  const myValidationErrors: { [key: string]: any } = {};

  // Recursion using inner function to handle nested objects
  function _ValidationErrorsFormat(validationErrors, property?: string) {
    for (const validationError of validationErrors) {
      if (
        validationError.children != undefined &&
        validationError.children.length > 0
      ) {
        _ValidationErrorsFormat(
          validationError.children,
          validationError.property
        );
      } else {
        const key =
          property != undefined && property.length > 0
            ? property + "." + validationError.property
            : validationError.property;
        myValidationErrors[key] = [];
        const constraints = Object.keys(validationError.constraints);
        for (const constraint of constraints) {
          myValidationErrors[key].push(ValidationErrorCodes[constraint]);
        }
      }
    }
  }

  _ValidationErrorsFormat(validationErrors);

  // return exception
  const invalidParams = ErrorCodes.INVALID_PARAMS;
  invalidParams.fields = myValidationErrors;
  return new InvalidParamsException(invalidParams);
}
