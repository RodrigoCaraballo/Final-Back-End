import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';
/**
 *
 * Clase encargada de capturar los errores de mongo
 *
 * @export MongoExceptionFilter se exporta la calse
 * @class MongoExceptionFilter Nombre de la clase
 * @implements {ExceptionFilter<MongoServerError>} Implementa la interface ExceptionFilter con tipo MongoServerError
 */
@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter<MongoServerError> {
  /**
   *
   * Metodo que realiza la captura de errores
   *
   * @param {MongoServerError} exception Errores
   * @param {ArgumentsHost} host Obtiene los argumentos
   * @memberof MongoExceptionFilter Pertenece a la clase MongoExceptionFilter
   */
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const statusCode = HttpStatus.CONFLICT;
    const details = exception;

    response.status(statusCode).json({ statusCode, message, details });
  }
}
