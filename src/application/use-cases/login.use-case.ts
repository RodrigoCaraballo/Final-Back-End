import { Inject, Injectable } from '@nestjs/common';

import { Observable, map, catchError } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { IUserModel, IUserRepository } from '../../domain';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  execute(uid: string): Observable<string> {
    return this.userRepository.getUser(uid).pipe(
      map((user: IUserModel) => {
        if (user.activate) {
          const payload = {
            id: user.id,
            uid: user.uid,
            email: user.email,
            role: user.role,
          };
          return jwt.sign(payload, process.env.SECRET_KEY || 'final-back');
        }
        throw new Error(`User ${user.uid} is already unactivated`);
      }),
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }
}
