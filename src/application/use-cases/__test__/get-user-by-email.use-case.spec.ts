import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { IUserModel, IUserRepository, RolesEnum } from "../../../domain";
import { GetAllStudentByEmailUseCase } from "../get-all-students-by-email.use.case";
import { GetAllUserUseCase } from "../get-all-user.use-case";
import { GetUserByEmailUseCase } from "../get-user-by-email.use-case";


describe('Get User By Email', () => {
    let useCase: GetUserByEmailUseCase;
    let repository: IUserRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetUserByEmailUseCase,
                {
                    provide: 'IUserRepository',
                    useValue: {
                        getUserByEmail: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<GetUserByEmailUseCase>(GetUserByEmailUseCase);
        repository = module.get<IUserRepository>('IUserRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get User by Email', () => {
        it('should return User', async () => {
            // Arrange
            const email = 'mail'
            const student: IUserModel = {
                uid: '13233',
                email: 'mail@example.com',
                activate: true,
                name: 'John',
                role: RolesEnum.COACH
            }


            jest.spyOn(repository, 'getUserByEmail').mockReturnValue(of(student));

            // Act
            const result = useCase.execute(email);

            // Assert
            expect(await lastValueFrom(result)).toEqual(student);
        });

        it('should throw an error if getUserByEmail fails', async () => {
            // Arrange
            const email = 'mail'
            const error = new Error('Error')

            const errorExpected = new Error('Error');
            jest.spyOn(repository, 'getUserByEmail').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(email);

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrow(errorExpected);
        });
    });
});