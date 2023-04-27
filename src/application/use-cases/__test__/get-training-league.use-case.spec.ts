import { Test, TestingModule } from "@nestjs/testing";
import { CreateTrainingLeagueDTO, ITrainingLeagueRepository, TrainingLeagueModel } from "../../../domain";
import { CreateTrainingLeagueUseCase } from "../create-training-league.use-case";
import { BadRequestException } from "@nestjs/common";
import { of, lastValueFrom, throwError } from 'rxjs';
import { GetAllTrainingsUseCase } from "../get-all-trainings.use-case";
import { GetTrainingLeagueUseCase } from "../get-training-league.use-case";


describe('Company Login Use Case', () => {
    let useCase: GetTrainingLeagueUseCase;
    let repository: ITrainingLeagueRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetTrainingLeagueUseCase,
                {
                    provide: 'ITrainingLeagueRepository',
                    useValue: {
                        getTrainingLeagueById: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<GetTrainingLeagueUseCase>(GetTrainingLeagueUseCase);
        repository = module.get<ITrainingLeagueRepository>('ITrainingLeagueRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('Get training', () => {
        it('should return a Training', async () => {
            // Arrange
            const id = '12341'

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

            jest.spyOn(repository, 'getTrainingLeagueById').mockReturnValue(of(mockTrainingLeague1));
            
            // Act
            const result = useCase.execute(id);
            
            // Assert
            expect(await lastValueFrom(result)).toEqual(mockTrainingLeague1);
            });
            
            it('should throw an error if getTrainingLeagueById fails', async () => {
            // Arrange
            const id = '12341'
            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(repository, 'getTrainingLeagueById').mockReturnValue(throwError(error));
            
            // Act
            const result$ = useCase.execute(id);
            
            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrowError(expectedError);
            });
    });
});