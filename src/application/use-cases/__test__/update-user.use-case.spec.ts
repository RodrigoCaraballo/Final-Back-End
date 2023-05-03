import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { IUserModel, IUserRepository, RolesEnum, UserDTO } from "../../../domain";
import { GetAllStudentByEmailUseCase } from "../get-all-students-by-email.use.case";
import { GetAllUserUseCase } from "../get-all-user.use-case";
import { GetUserByEmailUseCase } from "../get-user-by-email.use-case";
import { RegisterUseCase } from "../register.use-case";
import * as jwt from 'jsonwebtoken';
import { UpdateUserUseCase } from "../update-user.use-case";


describe('Udpate User', () => {
    let useCase: UpdateUserUseCase;
    let repository: IUserRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateUserUseCase,
                {
                    provide: 'IUserRepository',
                    useValue: {
                        updateUser: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
        repository = module.get<IUserRepository>('IUserRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Update User', () => {
        it('should return User', async () => {
            // Arrange
            const id = '1234'
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

            jest.spyOn(repository, 'updateUser').mockReturnValue(of(student));

            // Act
            const result = useCase.execute(id, user);

            // Assert
            expect(await lastValueFrom(result)).toEqual(student);
        });

        it('should throw an error if getUserByEmail fails', async () => {
            // Arrange
            const id = '1234'
            const user: UserDTO = {
                uid: '13233',
                email: 'mail@example.com',
                name: 'John',
            }
            const error = new Error('Error')

            const errorExpected = new Error('Error');
            jest.spyOn(repository, 'updateUser').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(id, user);

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrow(errorExpected);
        });
    });
});