import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { IStudentEvaluationRepository } from "../../../domain/repositories/student-evaluation.interface.repository";
import { GetTrainingEvaluationsUseCase } from "../get-all-student-evaluations.use-case";
import { CriterionAverage } from "../../../infrastructure/database/repositories/interfaces/interfaces.helpers";
import { GetStudentEvaluationUseCase } from "../get-student-evaluation.use.case";


describe('Get Student Evaluation', () => {
    let useCase: GetStudentEvaluationUseCase;
    let repository: IStudentEvaluationRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetStudentEvaluationUseCase,
                {
                    provide: 'IStudentEvaluationRepository',
                    useValue: {
                        getStudentEvaluation: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<GetStudentEvaluationUseCase>(GetStudentEvaluationUseCase);
        repository = module.get<IStudentEvaluationRepository>('IStudentEvaluationRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get training', () => {
        it('should return a Student Evaluation', async () => {
            // Arrange
            const studentId = '131'
            const trainingId = '131'

            const mockCriteria: CriterionAverage = {
                criterion: 'aaa',
                average: 1
            };

            jest.spyOn(repository, 'getStudentEvaluation').mockReturnValue(of(mockCriteria));

            // Act
            const result = useCase.execute(studentId, trainingId);

            // Assert
            expect(await lastValueFrom(result)).toEqual(mockCriteria);
        });

        it('should throw an error if getStudentEvaluation fails', async () => {
            // Arrange
            const studentId = '131'
            const trainingId = '131'
            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(repository, 'getStudentEvaluation').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(studentId, trainingId);

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrowError(expectedError);
        });
    });
});