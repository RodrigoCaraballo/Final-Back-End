import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

@Injectable()
export class GetAllUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}
  execute() {
    return this.userRepository.getAllUser();
  }
}
