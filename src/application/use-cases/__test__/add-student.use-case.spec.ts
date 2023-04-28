import { Test, TestingModule } from "@nestjs/testing";
import { CreateTrainingLeagueDTO, ITrainingLeagueRepository, IUserModel, IUserRepository, RolesEnum, TrainingLeagueModel } from "../../../domain";
import { CreateTrainingLeagueUseCase } from "../create-training-league.use-case";
import { NotFoundException } from "@nestjs/common";
import { of, lastValueFrom, throwError } from 'rxjs';
import { GetAllTrainingsUseCase } from "../get-all-trainings.use-case";
import { AddStudentUseCase } from "../add-student.use-case";


describe('Add Student Use Case', () => {
    let useCase: AddStudentUseCase;
    let repository: ITrainingLeagueRepository
    let userRepository: IUserRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AddStudentUseCase,
                {
                    provide: 'ITrainingLeagueRepository',
                    useValue: {
                        getStudentInTrainingLeague: jest.fn(),
                        addStudent: jest.fn(),
                    },
                },
                {
                    provide: 'IUserRepository',
                    useValue: {
                        getUserByEmail: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<AddStudentUseCase>(AddStudentUseCase);
        repository = module.get<ITrainingLeagueRepository>('ITrainingLeagueRepository');
        userRepository = module.get<IUserRepository>('IUserRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get all trainings', () => {
        it('should return true when a student is added to a training league successfully', async () => {
            // Arrange
            const mockUser: IUserModel = {
                uid: '123',
                email: 'test@example.com',
                name: 'test',
                activate: false,
                role: RolesEnum.COACH
            };

            const mockTrainingLeague: TrainingLeagueModel = {
                title: 'Training',
                cicle: 'Training',
                radar: 'radar',
                coach: '12312'
            }
            const mockTrainingId = '456';
            const expectedResult = true;

            jest.spyOn(userRepository, 'getUserByEmail').mockReturnValue(of(mockUser));
            jest.spyOn(repository, 'getStudentInTrainingLeague').mockReturnValue(of(false));
            jest.spyOn(repository, 'addStudent').mockReturnValue(of(mockTrainingLeague));

            // Act
            const result = useCase.execute(mockTrainingId, mockUser.email)

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedResult);
        });

        it('should return errors', async () => {
            // Arrange
            const mockUser: IUserModel = {
                uid: '123',
                email: 'test@example.com',
                name: 'test',
                activate: false,
                role: RolesEnum.COACH
            };
            const mockTrainingId = '456';
            const expectedResult = false;

            jest.spyOn(userRepository, 'getUserByEmail').mockReturnValue(of(mockUser));
            jest.spyOn(repository, 'getStudentInTrainingLeague').mockReturnValue(of(false));
            jest.spyOn(repository, 'addStudent').mockReturnValue(throwError(new Error('Error')));

            // Act
            const result = useCase.execute(mockTrainingId, mockUser.email)

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedResult);
        });

        it('should return errors', async () => {
            // Arrange
            const mockUser: IUserModel = {
                uid: '123',
                email: 'test@example.com',
                name: 'test',
                activate: false,
                role: RolesEnum.COACH
            };
            const mockTrainingId = '456';
            const expectedResult = false;

            jest.spyOn(userRepository, 'getUserByEmail').mockReturnValue(of(mockUser));
            jest.spyOn(repository, 'getStudentInTrainingLeague').mockReturnValue(of(true));

            // Act
            const result = useCase.execute(mockTrainingId, mockUser.email)

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedResult);
        });

        it('should throw NotFoundException when getUserByEmail returns empty', async () => {
            // Arrange
            const trainingId = 'training123';
            const emailStudent = 'student@example.com';
            jest.spyOn(userRepository, 'getUserByEmail').mockReturnValue(throwError(new NotFoundException('User not found')));
      
            // Act & Assert
            const result = useCase.execute(trainingId, emailStudent)

            await expect(lastValueFrom(result)).rejects.toThrow('User not found');
      
            // Assert
          });
    });
});