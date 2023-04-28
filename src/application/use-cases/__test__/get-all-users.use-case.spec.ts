import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { IUserModel, IUserRepository, RolesEnum } from "../../../domain";
import { GetAllStudentByEmailUseCase } from "../get-all-students-by-email.use.case";
import { GetAllUserUseCase } from "../get-all-user.use-case";


describe('Get All users', () => {
    let useCase: GetAllUserUseCase;
    let repository: IUserRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAllUserUseCase,
                {
                    provide: 'IUserRepository',
                    useValue: {
                        getAllUser: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<GetAllUserUseCase>(GetAllUserUseCase);
        repository = module.get<IUserRepository>('IUserRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get All Users', () => {
        it('should return User', async () => {
            // Arrange

            const student: IUserModel = {
                uid: '13233',
                email: 'mail@example.com',
                activate: true,
                name: 'John',
                role: RolesEnum.COACH
            }


            jest.spyOn(repository, 'getAllUser').mockReturnValue(of([student]));

            // Act
            const result = useCase.execute();

            // Assert
            expect(await lastValueFrom(result)).toEqual([student]);
        });

        it('should throw an error if getAllUser fails', async () => {
            // Arrange
            const error = new Error('Error')

            const errorExpected = new Error('Error');
            jest.spyOn(repository, 'getAllUser').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute();

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrow(errorExpected);
        });
    });
});