import { Test, TestingModule } from "@nestjs/testing";
import { CreateTrainingLeagueDTO, ITrainingLeagueRepository, TrainingLeagueModel } from "../../../domain";
import { CreateTrainingLeagueUseCase } from "../create-training-league.use-case";
import { BadRequestException } from "@nestjs/common";
import { of, lastValueFrom } from 'rxjs';


describe('Company Login Use Case', () => {
    let useCase: CreateTrainingLeagueUseCase;
    let repository: ITrainingLeagueRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTrainingLeagueUseCase,
                {
                    provide: 'ITrainingLeagueRepository',
                    useValue: {
                        getTrainingLeagueByCicleAndTittle: jest.fn(),
                        createTrainingLeague: jest.fn(),
                    },
                },
            ],
        }).compile();
        useCase = module.get<CreateTrainingLeagueUseCase>(CreateTrainingLeagueUseCase);
        repository = module.get<ITrainingLeagueRepository>('ITrainingLeagueRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('create training', () => {
        it('should throw BadRequestException if training league already exists', async () => {
            // Arrange
            const data: CreateTrainingLeagueDTO = {
                title: 'Test Training',
                cicle: '2022-01',
                coach: '3112421'
            };
            
            const mockTrainingLeague: TrainingLeagueModel = {
            title: 'Test Training',
            cicle: '2022-01',
            radar: '123131',
            coach: '3112421'
            };
            
            jest.spyOn(repository, 'getTrainingLeagueByCicleAndTittle').mockReturnValue(of(mockTrainingLeague));
            
            // Act
            const result$ = useCase.execute(data);
            
            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrow(BadRequestException);
            });
            
            it('should create a new training league', async () => {
            // Arrange
            const data: CreateTrainingLeagueDTO = {
                title: 'Test Training',
                cicle: '2022-01',
                coach: '3112421'
            };

            const mockTrainingLeague: TrainingLeagueModel = {
                title: 'Test Training',
                cicle: '2022-01',
                radar: '123131',
                coach: '3112421'
                };
            
            jest.spyOn(repository, 'getTrainingLeagueByCicleAndTittle').mockReturnValue(of(null));
            jest.spyOn(repository, 'createTrainingLeague').mockReturnValue(of(mockTrainingLeague));
            
            // Act
            const result$ = useCase.execute(data);
            
            // Assert
            expect(await lastValueFrom(result$)).toEqual(mockTrainingLeague);
            });
    });
});