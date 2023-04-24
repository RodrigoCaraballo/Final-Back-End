import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, map, of } from 'rxjs';
import * as jwt from 'jsonwebtoken'
/**
 * The UserGuard class implements the CanActivate interface and overrides the canActivate() function.
 *
 * @export
 * @class UserGuard
 * @implements {CanActivate}
 */
@Injectable()
export class CoachGuard implements CanActivate {
  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return of(request)
      .pipe(
        map(
          (request => {
            const role = request.headers.authorization;
            return role === 'Coach';
          }),
        )
      )
  }
}