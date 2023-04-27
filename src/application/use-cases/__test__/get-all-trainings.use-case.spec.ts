import { Test, TestingModule } from "@nestjs/testing";
import { CreateTrainingLeagueDTO, ITrainingLeagueRepository, TrainingLeagueModel } from "../../../domain";
import { CreateTrainingLeagueUseCase } from "../create-training-league.use-case";
import { BadRequestException } from "@nestjs/common";
import { of, lastValueFrom, throwError } from 'rxjs';
import { GetAllTrainingsUseCase } from "../get-all-trainings.use-case";


describe('Company Login Use Case', () => {
    let useCase: GetAllTrainingsUseCase;
    let repository: ITrainingLeagueRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAllTrainingsUseCase,
                {
                    provide: 'ITrainingLeagueRepository',
                    useValue: {
                        getAllTrainingLeagues: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<GetAllTrainingsUseCase>(GetAllTrainingsUseCase);
        repository = module.get<ITrainingLeagueRepository>('ITrainingLeagueRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get all trainings', () => {
        it('should return an array of TrainingLeagueModel objects', async () => {
            // Arrange
            const mockTrainingLeague1: TrainingLeagueModel = {
            title: 'Mock Training League 1',
            cicle: '1',
            coach: 'coach123',
            radar: '12314'
            };
            const mockTrainingLeague2: TrainingLeagueModel = {
            title: 'Mock Training League 2',
            cicle: '2',
            coach: 'coach456',
            radar: '12314'
            };

            const arrayMock: TrainingLeagueModel[] = [mockTrainingLeague1, mockTrainingLeague2]
            jest.spyOn(repository, 'getAllTrainingLeagues').mockReturnValue(of(arrayMock));
            
            // Act
            const result = useCase.execute();
            
            // Assert
            expect(await lastValueFrom(result)).toEqual([mockTrainingLeague1, mockTrainingLeague2]);
            });
            
            it('should throw an error if getAllTrainingLeagues fails', async () => {
            // Arrange
            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(repository, 'getAllTrainingLeagues').mockReturnValue(throwError(error));
            
            // Act
            const result$ = useCase.execute();
            
            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrowError(expectedError);
            });
    });
});