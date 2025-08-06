import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./exception-filter/all-exceptions-filter";
import { ValidationError, ValidationPipe } from "@nestjs/common";
import { InvalidParamsException } from "./exception/invalid-params-exception";
import { ValidationErrorCodes } from "./constants/validation-error-codes";
import { EnvironmentVariables } from "../env/env.configuration";
import { ErrorCodes } from "./constants/error-codes";
import { useContainer } from "class-validator";
import * as mongoose from "mongoose";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return ValidationErrorsFormat(errors);
      },
    })
  );
  app.useGlobalGuards();
  /**
   * Cors
   */
  app.enableCors();

  // ✅ Swagger setup
  const config = new DocumentBuilder()
    .setTitle("Movie App API")
    .setDescription("API documentation for the Movie App")
    .setVersion("1.0")
    .addBearerAuth() // for JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document); // Accessible at /docs

  await app.listen(EnvironmentVariables().port);
  mongoose.set("debug", Boolean(EnvironmentVariables().mongodb.mongooseDebug));
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
