import { Controller, Post, Body, Param } from '@nestjs/common'
import { Observable, catchError } from 'rxjs';
import { LoginUseCase, RegisterUseCase } from '../../application/';
import { UserDTO } from '../../domain';

@Controller('login')
export class LoginController {

    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly registerUseCase: RegisterUseCase
    ) { }

    //Change the UserCommand to a DTO
    @Post('login/:uid')
    loginUser(@Param() uid: string): Observable<string> {
        return this.loginUseCase.execute(uid)
            .pipe(
                catchError(error => {
                    throw new Error(error.message);
                })
            )
    }

    @Post('register')
    registerUser(@Body() user: UserDTO): Observable<string> {
        return this.registerUseCase.execute(user)
            .pipe(
                catchError(error => {
                    throw new Error(error.message);
                })
            )
    }
}