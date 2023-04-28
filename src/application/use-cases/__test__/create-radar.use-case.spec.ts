import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { IRadarRepository, RadarDTO } from "../../../domain";
import { CreateRadarUseCase } from "../create-radar.use-case";


describe('Add Radar', () => {
    let useCase: CreateRadarUseCase;
    let repository: IRadarRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateRadarUseCase,
                {
                    provide: 'IRadarRepository',
                    useValue: {
                        createRadar: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<CreateRadarUseCase>(CreateRadarUseCase);
        repository = module.get<IRadarRepository>('IRadarRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Create Radar', () => {
        it('should return true', async () => {
            // Arrange

            const addRadar: RadarDTO = {
                name: 'Add Radar',
                trainingId: 'trainingId',
                criteria: [],
            }

            const mockRadar = {
                name: 'Add Radar',
                trainingId: 'trainingId',
                criteria: [],
            }

            jest.spyOn(repository, 'createRadar').mockReturnValue(of(mockRadar));

            // Act
            const result = useCase.execute(addRadar);

            // Assert
            expect(await lastValueFrom(result)).toEqual(mockRadar);
        });

        it('should throw an error if createCriteria fails', async () => {
            // Arrange
            const addRadar: RadarDTO = {
                name: 'Add Radar',
                trainingId: 'trainingId',
                criteria: [],
            }

            const error = new Error('Error')

            const errorExpected = new Error('Error');
            jest.spyOn(repository, 'createRadar').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(addRadar);

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrow(errorExpected);
        });
    });
});