import { Test, TestingModule } from "@nestjs/testing";
import { of, lastValueFrom, throwError } from 'rxjs';
import { AddRadarDTO, ITrainingLeagueRepository, TrainingLeagueModel } from "../../../domain";
import { AddRadarUseCase } from "../add-radar.use-case";


describe('Add Radar', () => {
    let useCase: AddRadarUseCase;
    let repository: ITrainingLeagueRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AddRadarUseCase,
                {
                    provide: 'ITrainingLeagueRepository',
                    useValue: {
                        getTrainingLeagueById: jest.fn(),
                        addRadar: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<AddRadarUseCase>(AddRadarUseCase);
        repository = module.get<ITrainingLeagueRepository>('ITrainingLeagueRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Add Radar', () => {
        it('should return true', async () => {
            // Arrange

            const addRadar: AddRadarDTO = {
                trainingId: '1234',
                radarId: '1234'
            }

            const mockTraining1: TrainingLeagueModel = {
                title: 'aaa',
                cicle: 'aaa',
                coach: 'aaa',
                radar: '12364',
            };

            const mockTraining2: TrainingLeagueModel = {
                title: 'aaa',
                cicle: 'aaa',
                coach: 'aaa',
                radar: '1234',
            };

            const expected = true

            jest.spyOn(repository, 'getTrainingLeagueById').mockReturnValue(of(mockTraining1));
            jest.spyOn(repository, 'addRadar').mockReturnValue(of(mockTraining2));

            // Act
            const result = useCase.execute(addRadar);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expected);
        });

        it('should throw an error if createCriteria fails', async () => {
            // Arrange
            const addRadar: AddRadarDTO = {
                trainingId: '1234',
                radarId: '1234'
            }
            const mockTraining1: TrainingLeagueModel = {
                title: 'aaa',
                cicle: 'aaa',
                coach: 'aaa',
                radar: '12364',
            };

            const error = new Error('Error');
            const expectedError = false
            jest.spyOn(repository, 'getTrainingLeagueById').mockReturnValue(of(mockTraining1));
            jest.spyOn(repository, 'addRadar').mockReturnValue(throwError(error));

            // Act
            const result$ = useCase.execute(addRadar);

            // Assert
            expect(await lastValueFrom(result$)).toBe(expectedError);
        });
    });
});