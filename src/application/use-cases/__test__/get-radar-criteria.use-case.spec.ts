import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { IRadarRepository, RadarDTO, RadarModel } from "../../../domain";
import { CreateRadarUseCase } from "../create-radar.use-case";
import { GetAllRadarsUseCase } from "../get-all-radars.use-case";
import { GetRadarCriteriaUseCase } from "../get-radar-criteria-use.case";
import { CriterionAverage } from "../../../infrastructure/database/repositories/interfaces/interfaces.helpers";


describe('Get Radar Criteria', () => {
    let useCase: GetRadarCriteriaUseCase;
    let repository: IRadarRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetRadarCriteriaUseCase,
                {
                    provide: 'IRadarRepository',
                    useValue: {
                        getById: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<GetRadarCriteriaUseCase>(GetRadarCriteriaUseCase);
        repository = module.get<IRadarRepository>('IRadarRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get all radars', () => {
        it('should return radars', async () => {
            // Arrange
            const id = '1234'

            const radar: RadarModel = {
                name: 'radar',
                criteria: ['daa'],
                trainingId: 'training'
            }

            const mockCriterion: CriterionAverage = {
                criterion: 'daa',
                average: 0
            }

            jest.spyOn(repository, 'getById').mockReturnValue(of(radar));

            // Act
            const result = useCase.execute(id);

            // Assert
            expect(await lastValueFrom(result)).toEqual([mockCriterion]);
        });

        it('should throw an error if getById fails', async () => {
            // Arrange
            const id = '1234'
            const error = new Error('Error')

            const errorExpected = new Error('Error');
            jest.spyOn(repository, 'getById').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(id);

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrow(errorExpected);
        });
    });
});