import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories';
import { UserDTO } from '../../domain/dto';
import { UpdateUserDto } from '../../domain/dto/update-use.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
  ) {}
  execute(id: string, user: UpdateUserDto) {
    return this.userRepository.updateUser(id, user);
  }
}
