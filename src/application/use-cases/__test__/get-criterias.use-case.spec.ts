import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { CriteriaDTO, ICriteriaRepository } from "../../../domain";
import { CreateCriteriaUseCase } from "../create-criteria.use-case";
import { GetCriteriasUseCase } from "../get-criterias.use-case";


describe('Get Criteria', () => {
    let useCase: GetCriteriasUseCase;
    let repository: ICriteriaRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetCriteriasUseCase,
                {
                    provide: 'ICriteriaRepository',
                    useValue: {
                        findCriterias: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<GetCriteriasUseCase>(GetCriteriasUseCase);
        repository = module.get<ICriteriaRepository>('ICriteriaRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get Criterias', () => {
        it('should return a Criteria', async () => {
            // Arrange

            const mockCriteria: CriteriaDTO = {
                name: 'aaa',
                area: 'foo',
                descriptor: 'foo',
                minQualiRequired: 1
            };

            jest.spyOn(repository, 'findCriterias').mockReturnValue(of([mockCriteria]));

            // Act
            const result = useCase.execute();

            // Assert
            expect(await lastValueFrom(result)).toEqual([mockCriteria]);
        });

        it('should throw an error if findCriterias fails', async () => {
            // Arrange

            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(repository, 'findCriterias').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute();

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrowError(expectedError);
        });
    });
});