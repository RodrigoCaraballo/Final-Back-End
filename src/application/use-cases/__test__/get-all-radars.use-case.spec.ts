import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { IRadarRepository, RadarDTO } from "../../../domain";
import { CreateRadarUseCase } from "../create-radar.use-case";
import { GetAllRadarsUseCase } from "../get-all-radars.use-case";


describe('Get All Radars', () => {
    let useCase: GetAllRadarsUseCase;
    let repository: IRadarRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAllRadarsUseCase,
                {
                    provide: 'IRadarRepository',
                    useValue: {
                        getAllRadars: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<GetAllRadarsUseCase>(GetAllRadarsUseCase);
        repository = module.get<IRadarRepository>('IRadarRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get all radars', () => {
        it('should return radars', async () => {
            // Arrange

            const mockRadar = {
                name: 'Add Radar',
                trainingId: 'trainingId',
                criteria: [],
            }

            jest.spyOn(repository, 'getAllRadars').mockReturnValue(of([mockRadar]));

            // Act
            const result = useCase.execute();

            // Assert
            expect(await lastValueFrom(result)).toEqual([mockRadar]);
        });

        it('should throw an error if getAllRadars fails', async () => {
            // Arrange

            const error = new Error('Error')

            const errorExpected = new Error('Error');
            jest.spyOn(repository, 'getAllRadars').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute();

            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrow(errorExpected);
        });
    });
});