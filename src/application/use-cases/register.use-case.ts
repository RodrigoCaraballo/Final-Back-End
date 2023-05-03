import { Inject, Injectable } from '@nestjs/common';
import { Observable, map, catchError } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { IUserModel, IUserRepository, UserDTO } from '../../domain';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  execute(command: UserDTO): Observable<string> {
    return this.userRepository.createUser(command).pipe(
      map((user: IUserModel) => {
        const payload = { name: user.name, email: user.email };
        return jwt.sign(payload, process.env.SECRET_KEY || 'final-back');
      }),
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }
}
