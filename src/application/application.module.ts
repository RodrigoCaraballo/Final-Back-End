import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure';
import { LoginUseCase, RegisterUseCase } from './use-cases';
import { GetAllUserUseCase } from './use-cases/get-all-user.use-case';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    LoginUseCase,
    RegisterUseCase,
    GetAllUserUseCase,
    GetUserByEmailUseCase,
  ],
  exports: [
    LoginUseCase,
    RegisterUseCase,
    GetAllUserUseCase,
    GetUserByEmailUseCase,
  ],
})
export class ApplicationModule {}
