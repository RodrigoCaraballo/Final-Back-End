import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { IUserModel, IUserRepository, RolesEnum } from "../../../domain";
import { GetAllStudentByEmailUseCase } from "../get-all-students-by-email.use.case";


describe('Get All Student', () => {
    let useCase: GetAllStudentByEmailUseCase;
    let repository: IUserRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAllStudentByEmailUseCase,
                {
                    provide: 'IUserRepository',
                    useValue: {
                        getAllStudentsByEmail: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<GetAllStudentByEmailUseCase>(GetAllStudentByEmailUseCase);
        repository = module.get<IUserRepository>('IUserRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get All Student by Email', () => {
        it('should return Student', async () => {
            // Arrange
            const email = 'mail'

            const student: IUserModel = {
                uid: '13233',
                email: 'mail@example.com',
                activate: true,
                name: 'John',
                role: RolesEnum.COACH
            }


            jest.spyOn(repository, 'getAllStudentsByEmail').mockReturnValue(of([student]));

            // Act
            const result = useCase.execute(email);

            // Assert
            expect(await lastValueFrom(result)).toEqual([student]);
        });

        it('should return Student', async () => {
            // Arrange
            const email = undefined

            const student: IUserModel = {
                uid: '13233',
                email: 'mail@example.com',
                activate: true,
                name: 'John',
                role: RolesEnum.COACH
            }


            jest.spyOn(repository, 'getAllStudentsByEmail').mockReturnValue(of([student]));

            // Act
            const result = useCase.execute(email);

            // Assert
            expect(await lastValueFrom(result)).toEqual([student]);
        });

        it('should throw an error if getAllStudentsByEmail fails', async () => {
            // Arrange
            const email = 'mail'
            const error = new Error('Error')

            const errorExpected = new Error('Error');
            jest.spyOn(repository, 'getAllStudentsByEmail').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(email);

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrow(errorExpected);
        });
    });
});