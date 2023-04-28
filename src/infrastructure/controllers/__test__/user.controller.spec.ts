import { User, UserRepository } from 'src/infrastructure/database';
import { LoginController } from '../user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import {
  GetAllUserUseCase,
  GetUserByEmailUseCase,
  LoginUseCase,
  RegisterUseCase,
  UpdateUserUseCase,
} from '../../../application/';
import { GetAllStudentByEmailUseCase } from '../../../application/use-cases/get-all-students-by-email.use.case';
import { of } from 'rxjs';
import { DUserDto } from '../../utils/dtos/user.dto';
import { DUpdateUserDto } from '../../utils/dtos/update-user.dto';
import { GetUserEmailDto } from '../../utils/dtos/get-user-email.dto';

describe('UserController', () => {
  let controller: LoginController;
  let loginUseCase: LoginUseCase;
  let registerUseCase: RegisterUseCase;
  let getAllUserUseCase: GetAllUserUseCase;
  let getUserByEmailUseCase: GetUserByEmailUseCase;
  let updateUserUseCase: UpdateUserUseCase;
  let getAllStudentsByEmailUseCase: GetAllStudentByEmailUseCase;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginController,
        {
          provide: LoginUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: RegisterUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetUserByEmailUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllStudentByEmailUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<LoginController>(LoginController);
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
    registerUseCase = module.get<RegisterUseCase>(RegisterUseCase);
    getAllUserUseCase = module.get<GetAllUserUseCase>(GetAllUserUseCase);
    getUserByEmailUseCase = module.get<GetUserByEmailUseCase>(
      GetUserByEmailUseCase,
    );
    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    getAllStudentsByEmailUseCase = module.get<GetAllStudentByEmailUseCase>(
      GetAllStudentByEmailUseCase,
    );
  });
  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('Validations', () => {
    it('test_login_user_successfully', () => {
      //Arrange
      jest.spyOn(loginUseCase, 'execute').mockReturnValue(of('token'));
      //Act
      const result = controller.loginUser('123');
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual('token');
        },
      });
    });
    it('test_register_user_successfully', () => {
      //Arrange
      jest.spyOn(registerUseCase, 'execute').mockReturnValue(of('token'));
      //Act
      const result = controller.registerUser(new DUserDto());
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual('token');
        },
      });
    });
    it('test_update_user_successfully', () => {
      //Arrange
      const mockData = {
        uid: '123',
        email: 'test@test.com',
        name: 'test',
        activate: true,
      };
      jest
        .spyOn(updateUserUseCase, 'execute')
        .mockReturnValue(of(mockData as any));
      //Act
      const result = controller.updateUser('123', new DUpdateUserDto());
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(mockData);
        },
      });
    });
    it('test_get_all_users_successfully', () => {
      //Arrange
      jest.spyOn(getAllUserUseCase, 'execute').mockReturnValue(of([]));
      //Act
      const result = controller.getAllUser();
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual([]);
        },
      });
    });
    it('test_get_user_by_email_successfully', () => {
      //Arrange
      const mockData = {
        uid: '123',
        email: 'test@test.com',
        name: 'test',
        activate: true,
      };
      jest
        .spyOn(getUserByEmailUseCase, 'execute')
        .mockReturnValue(of(mockData as any));
      //Act
      const result = controller.getUserByEmail(new GetUserEmailDto());
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(mockData);
        },
      });
    });
    it('test_get_all_students_by_email_successfully', () => {
      //Arrange
      jest
        .spyOn(getAllStudentsByEmailUseCase, 'execute')
        .mockReturnValue(of([]));
      //Act
      const result = controller.getAllStudentsByEmail();
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual([]);
        },
      });
    });
  });
});
