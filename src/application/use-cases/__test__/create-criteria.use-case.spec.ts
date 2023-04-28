import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { IStudentEvaluationRepository } from "../../../domain/repositories/student-evaluation.interface.repository";
import { GetTrainingEvaluationsUseCase } from "../get-all-student-evaluations.use-case";
import { CriterionAverage } from "../../../infrastructure/database/repositories/interfaces/interfaces.helpers";
import { GetStudentEvaluationUseCase } from "../get-student-evaluation.use.case";
import { AddCriteriaUseCase } from "../add-criteria.use-case";
import { CriteriaDTO, ICriteriaRepository, IRadarRepository, RadarModel } from "../../../domain";
import { CreateCriteriaUseCase } from "../create-criteria.use-case";


describe('Create Criteria', () => {
    let useCase: CreateCriteriaUseCase;
    let repository: ICriteriaRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCriteriaUseCase,
                {
                    provide: 'ICriteriaRepository',
                    useValue: {
                        createCriteria: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<CreateCriteriaUseCase>(CreateCriteriaUseCase);
        repository = module.get<ICriteriaRepository>('ICriteriaRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('add radar', () => {
        it('should return a Criteria', async () => {
            // Arrange
            const criteria = {
                name: 'aaa',
                area: 'foo',
                descriptor: 'foo',
                minQualiRequired: 1
            };

            const mockCriteria: CriteriaDTO = {
                name: 'aaa',
                area: 'foo',
                descriptor: 'foo',
                minQualiRequired: 1
            };

            jest.spyOn(repository, 'createCriteria').mockReturnValue(of(mockCriteria));

            // Act
            const result = useCase.execute(criteria);

            // Assert
            expect(await lastValueFrom(result)).toEqual(mockCriteria);
        });

        it('should throw an error if createCriteria fails', async () => {
            // Arrange
            const criteria = {
                name: 'aaa',
                area: 'foo',
                descriptor: 'foo',
                minQualiRequired: 1
            };

            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(repository, 'createCriteria').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(criteria);

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrowError(expectedError);
        });
    });
});