import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}
  execute(email: string) {
    return this.userRepository.getUserByEmail(email);
  }
}
