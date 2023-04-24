import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { LoginUseCase, RegisterUseCase } from '../../application/';
import { IUserModel } from '../../domain';
import { GetAllUserUseCase } from '../../application/use-cases/get-all-user.use-case';
import { GetUserByEmailUseCase } from '../../application/use-cases/get-user-by-email.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexUserSwagger } from '../../swagger/index-user.swagger';
import { NotFoundSwagger } from '../../swagger/not-found.swagger';
import { BadRequestSwagger } from '../../swagger/bad-request.swagger';
import { DUserDto } from '../utils/dtos/user.dto';
import { GetUserEmailDto } from '../utils/dtos/get-user-email.dto';
import { DUpdateUserDto } from '../utils/dtos/update-user.dto';

@ApiTags('User-Controller')
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
  @ApiOperation({
    summary: 'El usuario hace login, se busca por id de firebase',
  })
  @ApiResponse({
    status: 200,
    description: 'El usuario realiza un login exitoso',
    type: IndexUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro usuario',
    type: NotFoundSwagger,
  })
  @Post('login/:uid')
  loginUser(@Param('uid') uid: string): Observable<string> {
    return this.loginUseCase.execute(uid).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  @ApiOperation({
    summary: 'El usuario se registra',
  })
  @ApiResponse({
    status: 200,
    description: 'El usuario realiza un registro exitoso',
    type: IndexUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @Post('register')
  registerUser(@Body() user: DUserDto): Observable<string> {
    return this.registerUseCase.execute(user).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }
  @ApiOperation({
    summary: 'Se encuentra usuario por email',
  })
  @ApiResponse({
    status: 200,
    description: 'El usuario se encontro',
    type: IndexUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro usuario',
    type: NotFoundSwagger,
  })
  @Post('find-by-email')
  getUserByEmail(@Body() email: GetUserEmailDto): Observable<IUserModel> {
    return this.getUserByEmailUseCase.execute(email.email);
  }
  @ApiOperation({
    summary: 'Se encuentra todos los usuarios',
  })
  @ApiResponse({
    status: 200,
    description: 'El usuarios encontrados',
    type: IndexUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro usuario',
    type: NotFoundSwagger,
  })
  @Get('')
  getAllUser() {
    return this.getAllUserUseCase.execute();
  }
  @ApiOperation({
    summary: 'Se actualiza el usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'El usuario ha sido actualizado',
    type: IndexUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro usuario',
    type: NotFoundSwagger,
  })
  @Put('update/:id')
  updateUser(@Param('id') id: string, @Body() user: DUpdateUserDto) {
    return this.updateUserUseCase.execute(id, user);
  }
}
