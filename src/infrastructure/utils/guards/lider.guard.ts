import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class LiderGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const role = request.headers.authorization;

    if(role != 'lider') {
        return false
    }
    return true;
  }
}
