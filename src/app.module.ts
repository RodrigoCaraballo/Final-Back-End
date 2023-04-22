import { Module } from '@nestjs/common';
import { LoginController } from './infrastructure';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
