import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { LoginUseCase, RegisterUseCase } from '../../application/';
import { IUserModel, UserDTO } from '../../domain';
import { GetAllUserUseCase } from '../../application/use-cases/get-all-user.use-case';
import { GetUserByEmailUseCase } from '../../application/use-cases/get-user-by-email.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  //Change the UserCommand to a DTO
  @Post('login/:uid')
  loginUser(@Param('uid') uid: string): Observable<string> {
    return this.loginUseCase.execute(uid).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  @Post('register')
  registerUser(@Body() user: UserDTO): Observable<string> {
    return this.registerUseCase.execute(user).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }
  @Post('find-by-email')
  getUserByEmail(@Body() email: any): Observable<IUserModel> {
    return this.getUserByEmailUseCase.execute(email.email);
  }
  @Get('')
  getAllUser() {
    return this.getAllUserUseCase.execute();
  }
  @Put('update/:id')
  updateUser(@Param('id') id: string, @Body() user: UserDTO) {
    return this.updateUserUseCase.execute(id, user);
  }
}
