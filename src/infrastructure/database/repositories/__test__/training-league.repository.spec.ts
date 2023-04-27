import { Model } from "mongoose";
import { TrainingLeague } from "../../schemas";
import { TrainingLeagueRepository } from "../training-league.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { CreateTrainingLeagueDTO } from "../../../../domain";

describe('Company Repository', () => {
    let repository: TrainingLeagueRepository;
    let model: Model<TrainingLeague>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TrainingLeagueRepository,
                {
                    provide: getModelToken(TrainingLeague.name),
                    useValue: {
                        create: jest.fn(),
                        findById: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                    },
                },
            ],
        }).compile();
        repository = module.get<TrainingLeagueRepository>(TrainingLeagueRepository);
        model = module.get<Model<TrainingLeague>>(getModelToken(TrainingLeague.name));
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('create', () => {
        it('should return a new User', async () => {
            // Arrange
            const training: CreateTrainingLeagueDTO = {
                name: 'Company',
                username: 'foo',
                password: 'bar',
                email: 'efpyi@example.com',
            };

            const mockCompany = {
                name: 'Company',
                username: 'foo',
                password: 'bar',
                email: 'efpyi@example.com',
            };
            const expectedCompany = {
                name: 'Company',
                username: 'foo',
                password: 'bar',
                email: 'efpyi@example.com',
            };
            jest.spyOn(model, 'create').mockResolvedValue(mockCompany as any);

            // Act
            const result = repository.save(company);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedCompany);
        });

        it('should throw an error if saves fails', async () => {
            // Arrange
            const company: ICompanyModel = {
                name: 'Company',
                username: 'foo',
                password: 'bar',
                email: 'efpyi@example.com',
            };
            const error = new Error();
            const expectedError = new Error('Error creating company - Company Repository');
            jest.spyOn(model, 'create').mockRejectedValue(error);

            // Act
            const result = repository.save(company as any);

            // Assert
            await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
        });
    });

    describe('Get By Username and Password', () => {
        it('should return a user', async () => {
            // Arrange
            const username = 'foo';
            const password = 'bar';

            const mockedUser = {
                _id: '641c70d41964e9445f593bcc',
                name: 'Company',
                username: 'foo',
                password: 'bar',
                email: 'efpyi@example.com',
            };
            const expectedUser = {
                _id: '641c70d41964e9445f593bcc',
                name: 'Company',
                username: 'foo',
                password: 'bar',
                email: 'efpyi@example.com',
            };
            jest.spyOn(model, 'findOne').mockResolvedValue(mockedUser as any);

            // Act
            const result = repository.getByUsernameAndPassword(username, password);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedUser);
        });

        it('should throw an error if get fails', async () => {
            // Arrange
            const username = 'foo';
            const password = 'bar';

            const error = new Error();
            const expectedError = new Error('Error getting company - Company Repository');
            jest.spyOn(model, 'findOne').mockRejectedValue(error);

            // Act
            const result = repository.getByUsernameAndPassword(username, password);

            // Assert
            await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
        });
    });

    describe('Get By Email', () => {
        it('should return a user', async () => {
            // Arrange
            const email = 'efpyi@example.com';

            const mockedUser = {
                _id: '641c70d41964e9445f593bcc',
                name: 'Company',
                username: 'foo',
                password: 'bar',
                email: 'efpyi@example.com',
            };

            const expectedUser = {
                _id: '641c70d41964e9445f593bcc',
                name: 'Company',
                username: 'foo',
                password: 'bar',
                email: 'efpyi@example.com',
            };

            jest.spyOn(model, 'findOne').mockResolvedValue(mockedUser as any);

            // Act
            const result = repository.getByEmail(email);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedUser);
        });

        it('should throw an error if get fails', async () => {
            // Arrange
            const email = 'efpyi@example.com';

            const error = new Error();
            const expectedError = new Error('Error getting company - User Repository');
            jest.spyOn(model, 'findOne').mockRejectedValue(error);

            // Act
            const result = repository.getByEmail(email);

            // Assert
            await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
        });
    });
});