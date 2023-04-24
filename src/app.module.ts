import { Module } from '@nestjs/common';
import { LoginController } from './infrastructure';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { APP_FILTER } from '@nestjs/core';
import { MongoExceptionFilter } from './infrastructure/utils/exception-filters';
import { ErrorExceptionFilter } from './infrastructure/utils/exception-filters/error.exception-filter';

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorExceptionFilter,
    },
  ],
})
export class AppModule {}
