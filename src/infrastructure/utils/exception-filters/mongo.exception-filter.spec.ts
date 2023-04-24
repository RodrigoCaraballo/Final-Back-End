import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { MongoExceptionFilter } from './mongo.exception-filter';
import { MongoServerError } from 'mongodb';

describe('MongoServerErrorExceptionFilter', () => {
  let filter: MongoExceptionFilter;
  let host: ArgumentsHost;

  beforeEach(() => {
    filter = new MongoExceptionFilter();
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    } as any as ArgumentsHost;
  });

  it('catch error return message', () => {
    // Arrange
    const exception = new MongoServerError({ message: 'Duplicate key error' });
    const expectedResponse = {
      statusCode: HttpStatus.CONFLICT,
      message: 'Duplicate key error',
      details: exception,
    };

    // Act
    filter.catch(exception, host);
    const response = host.switchToHttp().getResponse<Response>();

    // Assert
    expect(response.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(response.json).toHaveBeenCalledWith(expectedResponse);
  });
});
