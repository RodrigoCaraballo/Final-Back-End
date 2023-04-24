import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories';
import { UserDTO } from '../../domain/dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
  ) {}
  execute(id: string, user: UserDTO) {
    return this.userRepository.updateUser(id, user);
  }
}
