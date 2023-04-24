import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const message = exception.message;
    const statusCode = exception instanceof Error ? 400 : response.statusCode;
    const details = exception;

    response.status(statusCode).json({ statusCode, message, details });
  }
}
