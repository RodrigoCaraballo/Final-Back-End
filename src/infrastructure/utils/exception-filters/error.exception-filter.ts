import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, NotFoundException } from '@nestjs/common';
import { MongoServerError } from 'mongodb';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const message = exception.message;
    let statusCode;

    if (exception instanceof MongoServerError && exception.code === 11000) {
      statusCode = HttpStatus.CONFLICT;
    } else if (exception instanceof NotFoundException) {
      statusCode = HttpStatus.NOT_FOUND;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const details = exception;

    response.status(statusCode).json({ statusCode, message, details });
  }
}
