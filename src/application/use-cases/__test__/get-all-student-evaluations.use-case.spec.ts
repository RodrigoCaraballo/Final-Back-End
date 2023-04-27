import { Test, TestingModule } from "@nestjs/testing";
import { CreateTrainingLeagueDTO, ITrainingLeagueRepository, StudentEvaluationDTO, TrainingLeagueModel } from "../../../domain";
import { CreateTrainingLeagueUseCase } from "../create-training-league.use-case";
import { BadRequestException } from "@nestjs/common";
import { of, lastValueFrom, throwError } from 'rxjs';
import { GetAllTrainingsUseCase } from "../get-all-trainings.use-case";
import { GetTrainingLeagueUseCase } from "../get-training-league.use-case";
import { CreateStudentEvaluationUseCase } from "../create-student-evaluation.use.case";
import { IStudentEvaluationRepository } from "../../../domain/repositories/student-evaluation.interface.repository";
import { GetTrainingEvaluationsUseCase } from "../get-all-student-evaluations.use-case";
import { CriterionAverage } from "../../../infrastructure/database/repositories/interfaces/interfaces.helpers";


describe('Get All Training Evaluation', () => {
    let useCase: GetTrainingEvaluationsUseCase;
    let repository: IStudentEvaluationRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetTrainingEvaluationsUseCase,
                {
                    provide: 'IStudentEvaluationRepository',
                    useValue: {
                        getTrainingEvaluations: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<GetTrainingEvaluationsUseCase>(GetTrainingEvaluationsUseCase);
        repository = module.get<IStudentEvaluationRepository>('IStudentEvaluationRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get training', () => {
        it('should return a Student Evaluation', async () => {
            // Arrange
            const id = '131'

            const mockCriteria: CriterionAverage = {
                criterion: 'aaa',
                average: 1
            };

            jest.spyOn(repository, 'getTrainingEvaluations').mockReturnValue(of([mockCriteria]));

            // Act
            const result = useCase.execute(id);

            // Assert
            expect(await lastValueFrom(result)).toEqual([mockCriteria]);
        });

        it('should throw an error if getTrainingLeagueById fails', async () => {
            // Arrange
            const id = '131'
            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(repository, 'getTrainingEvaluations').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(id);

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrowError(expectedError);
        });
    });
});