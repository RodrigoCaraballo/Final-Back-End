import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { IStudentEvaluationRepository } from "../../../domain/repositories/student-evaluation.interface.repository";
import { GetTrainingEvaluationsUseCase } from "../get-all-student-evaluations.use-case";
import { CriterionAverage } from "../../../infrastructure/database/repositories/interfaces/interfaces.helpers";
import { GetStudentEvaluationUseCase } from "../get-student-evaluation.use.case";
import { AddCriteriaUseCase } from "../add-criteria.use-case";
import { ICriteriaRepository, IRadarRepository, RadarModel } from "../../../domain";


describe('Add Criteria', () => {
    let useCase: AddCriteriaUseCase;
    let repository: IRadarRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AddCriteriaUseCase,
                {
                    provide: 'IRadarRepository',
                    useValue: {
                        addCriteria: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<AddCriteriaUseCase>(AddCriteriaUseCase);
        repository = module.get<IRadarRepository>('IRadarRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('add radar', () => {
        it('should return a radar', async () => {
            // Arrange
            const criteriaId = '131'
            const radarId = '131'

            const mockRadar: RadarModel = {
                name: 'aaa',
                trainingId: '21313',
                criteria: ['1234'],
            };

            jest.spyOn(repository, 'addCriteria').mockReturnValue(of(mockRadar));

            // Act
            const result = useCase.execute(radarId, criteriaId);

            // Assert
            expect(await lastValueFrom(result)).toEqual(mockRadar);
        });

        it('should throw an error if addCriteria fails', async () => {
            // Arrange
            const criteriaId = '131'
            const radarId = '131'

            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(repository, 'addCriteria').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(radarId, criteriaId);

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrowError(expectedError);
        });
    });
});