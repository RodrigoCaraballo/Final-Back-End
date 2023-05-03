import { Test, TestingModule } from "@nestjs/testing";
import { CreateTrainingLeagueDTO, ITrainingLeagueRepository, StudentEvaluationDTO, TrainingLeagueModel } from "../../../domain";
import { CreateTrainingLeagueUseCase } from "../create-training-league.use-case";
import { BadRequestException } from "@nestjs/common";
import { of, lastValueFrom, throwError } from 'rxjs';
import { GetAllTrainingsUseCase } from "../get-all-trainings.use-case";
import { GetTrainingLeagueUseCase } from "../get-training-league.use-case";
import { CreateStudentEvaluationUseCase } from "../create-student-evaluation.use.case";
import { IStudentEvaluationRepository } from "../../../domain/repositories/student-evaluation.interface.repository";


describe('Company Login Use Case', () => {
    let useCase: CreateStudentEvaluationUseCase;
    let repository: IStudentEvaluationRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateStudentEvaluationUseCase,
                {
                    provide: 'IStudentEvaluationRepository',
                    useValue: {
                        createEvaluation: jest.fn(),
                        updateEvaluation: jest.fn(),
                        verifyEvaluation: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<CreateStudentEvaluationUseCase>(CreateStudentEvaluationUseCase);
        repository = module.get<IStudentEvaluationRepository>('IStudentEvaluationRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get training', () => {
        it('should return a Student Evaluation', async () => {
            // Arrange
            const data: StudentEvaluationDTO = {
                trainingLeague: '12314',
                student: '13141',
                evaluations: []
            };

            const mockStudentEvaluation: StudentEvaluationDTO = {
                trainingLeague: '12314',
                student: '13141',
                evaluations: []
            };

            jest.spyOn(repository, 'verifyEvaluation').mockReturnValue(of(false));
            jest.spyOn(repository, 'createEvaluation').mockReturnValue(of(mockStudentEvaluation));

            // Act
            const result = useCase.execute(data);

            // Assert
            expect(await lastValueFrom(result)).toEqual(mockStudentEvaluation);
        });

        it('should return a Student Evaluation Updated', async () => {
            // Arrange
            const data: StudentEvaluationDTO = {
                trainingLeague: '12314',
                student: '13141',
                evaluations: []
            };

            const mockStudentEvaluation: StudentEvaluationDTO = {
                trainingLeague: '12314',
                student: '13141',
                evaluations: []
            };

            jest.spyOn(repository, 'verifyEvaluation').mockReturnValue(of(true));
            jest.spyOn(repository, 'updateEvaluation').mockReturnValue(of(mockStudentEvaluation));

            // Act
            const result = useCase.execute(data);

            // Assert
            expect(await lastValueFrom(result)).toEqual(mockStudentEvaluation);
        });

        it('should throw an error if getTrainingLeagueById fails', async () => {
            // Arrange
            const data: StudentEvaluationDTO = {
                trainingLeague: '12314',
                student: '13141',
                evaluations: []
            };

            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(repository, 'verifyEvaluation').mockReturnValue(of(false));
            jest.spyOn(repository, 'createEvaluation').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(data);

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrowError(expectedError);
        });

        it('should throw an error if getTrainingLeagueById fails', async () => {
            // Arrange
            const data: StudentEvaluationDTO = {
                trainingLeague: '12314',
                student: '13141',
                evaluations: []
            };

            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(repository, 'verifyEvaluation').mockReturnValue(of(true));
            jest.spyOn(repository, 'updateEvaluation').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(data);

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrowError(expectedError);
        });
    });
});