import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { IUserModel, IUserRepository, RolesEnum, UserDTO } from "../../../domain";
import { GetAllStudentByEmailUseCase } from "../get-all-students-by-email.use.case";
import { GetAllUserUseCase } from "../get-all-user.use-case";
import { GetUserByEmailUseCase } from "../get-user-by-email.use-case";
import { RegisterUseCase } from "../register.use-case";
import * as jwt from 'jsonwebtoken';


describe('Register', () => {
    let useCase: RegisterUseCase;
    let repository: IUserRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RegisterUseCase,
                {
                    provide: 'IUserRepository',
                    useValue: {
                        createUser: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<RegisterUseCase>(RegisterUseCase);
        repository = module.get<IUserRepository>('IUserRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get User by Email', () => {
        it('should return User', async () => {
            // Arrange
            const user: UserDTO = {
                uid: '13233',
                email: 'mail@example.com',
                name: 'John',
            }
            const student: IUserModel = {
                uid: '13233',
                email: 'mail@example.com',
                activate: true,
                name: 'John',
                role: RolesEnum.COACH
            }

            const payload = { name: user.name, email: user.email };
            const token = jwt.sign(payload, process.env.SECRET_KEY || 'final-back');


            jest.spyOn(repository, 'createUser').mockReturnValue(of(student));

            // Act
            const result = useCase.execute(user);

            // Assert
            expect(await lastValueFrom(result)).toEqual(token);
        });

        it('should throw an error if getUserByEmail fails', async () => {
            // Arrange
            const user: UserDTO = {
                uid: '13233',
                email: 'mail@example.com',
                name: 'John',
            }
            const error = new Error('Error')

            const errorExpected = new Error('Error');
            jest.spyOn(repository, 'createUser').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(user);

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrow(errorExpected);
        });
    });
});