import { Model } from "mongoose";
import { TrainingLeague } from "../../schemas";
import { TrainingLeagueRepository } from "../training-league.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { CreateTrainingLeagueDTO, IUserModel, RolesEnum, TrainingLeagueModel } from "../../../../domain";
import { lastValueFrom, of } from 'rxjs';

describe('Training League Repository', () => {
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
                        findByIdAndUpdate: jest.fn(),
                        find: jest.fn(),
                        findById: jest.fn(),
                        findOne: jest.fn(),
                        exec: jest.fn(),
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
                title: 'foo',
                cicle: 'foo',
                coach: 'foo',
            };

            const mockTraining = {
                title: 'foo',
                cicle: 'foo',
                coach: 'foo',
            };
            const expectedTraining = {
                title: 'foo',
                cicle: 'foo',
                coach: 'foo',
            };

            jest.spyOn(model, 'create').mockResolvedValue(mockTraining as any);

            // Act
            const result = repository.createTrainingLeague(training);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedTraining);
        });

        it('should throw an error if saves fails', async () => {
            // Arrange
            const training: CreateTrainingLeagueDTO = {
                title: 'foo',
                cicle: 'foo',
                coach: 'foo',
            };;
            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(model, 'create').mockRejectedValue(error);

            // Act
            const result = repository.createTrainingLeague(training as any);

            // Assert
            await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
        });
    });

    describe('add student', () => {
        it('should add a student', async () => {
            // Arrange
            const trainingId = '123';
            const studentId = '23123';

            const mockTraining = {
                title: 'foo',
                cicle: 'foo',
                coach: 'foo',
                students: ['23123']
            };
            const expectedTraining = {
                title: 'foo',
                cicle: 'foo',
                coach: 'foo',
                students: ['23123']
            };

            jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(mockTraining as any);

            // Act
            const result = repository.addStudent(trainingId, studentId);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedTraining);
        })

        it('should throw an error if add student fails', async () => {
            // Arrange
            const trainingId = '123';
            const studentId = '23123';

            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(model, 'findByIdAndUpdate').mockRejectedValue(error);

            // Act
            const result = repository.addStudent(trainingId, studentId);

            // Assert
            await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
        });
    })

    describe('addRadar', () => {
        it('should add a radar', async () => {
            // Arrange
            const trainingId = '123';
            const data = {
                title: 'foo',
                cicle: 'foo',
                radar: '1234',
                coach: 'foo',
                students: ['23123']
            };

            const mockTraining = {
                title: 'foo',
                cicle: 'foo',
                radar: '1234',
                coach: 'foo',
                students: ['23123']
            };
            const expectedTraining = {
                title: 'foo',
                cicle: 'foo',
                radar: '1234',
                coach: 'foo',
                students: ['23123']
            };

            jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(mockTraining as any);

            // Act
            const result = repository.addRadar(trainingId, data);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedTraining);
        })

        it('should throw an error', async () => {
            // Arrange
            const trainingId = '123';
            const data = {
                title: 'foo',
                cicle: 'foo',
                radar: '1234',
                coach: 'foo',
                students: ['23123']
            };

            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(model, 'findByIdAndUpdate').mockRejectedValue(error);

            // Act
            const result = repository.addRadar(trainingId, data);

            // Assert
            await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
        })
    })

    describe('Get all trainings', () => {
        it('should return all trainings', async () => {
            // Arrange
            const coachId = '123';

            const mockTraining = {
                title: 'foo',
                cicle: 'foo',
                coach: 'foo',
                students: ['23123']
            };
            const expectedTraining = {
                title: 'foo',
                cicle: 'foo',
                coach: 'foo',
                students: ['23123']
            };

            jest.spyOn(model, 'find').mockReturnValue({
                exec: jest.fn().mockResolvedValue([mockTraining])
            } as any);

            // Act
            const result = repository.getAllTrainingLeagues(coachId);

            // Assert
            expect(await lastValueFrom(result)).toEqual([expectedTraining]);
        })

        it('should throw an error if get all fails', async () => {
            // Arrange
            const coachId = '123';

            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(model, 'find').mockReturnValue({
                exec: jest.fn().mockRejectedValue(error)
            } as any);

            // Act
            const result = repository.getAllTrainingLeagues(coachId);

            // Assert
            await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
        });
    })

    describe('Get training by id', () => {
        it('should return a  training', async () => {
            // Arrange
            const trainingId = '123';

            const mockTraining = {
                title: 'foo',
                cicle: 'foo',
                coach: 'foo',
                students: ['23123']
            };
            const expectedTraining = {
                title: 'foo',
                cicle: 'foo',
                coach: 'foo',
                students: ['23123']
            };

            jest.spyOn(model, 'findById').mockReturnValue({
                populate: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockTraining)
            } as any);

            // Act
            const result = repository.getTrainingLeagueById(trainingId);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedTraining);
        })

        it('should throw an error if get all fails', async () => {
            // Arrange
            const trainingId = '123';

            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(model, 'findById').mockReturnValue({
                populate: jest.fn().mockReturnThis(),
                exec: jest.fn().mockRejectedValue(error)
            } as any);

            // Act
            const result = repository.getTrainingLeagueById(trainingId);

            // Assert
            await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
        });

        describe('Get by Title and Cicle', () => {
            it('should return a trainingLeague', async () => {
                // Arrange
                const data: CreateTrainingLeagueDTO = {
                    title: 'foo',
                    cicle: 'foo',
                    coach: 'foo',
                }

                const mockTraining = {
                    title: 'foo',
                    cicle: 'foo',
                    coach: 'foo',
                    students: ['23123']
                };
                const expectedTraining = {
                    title: 'foo',
                    cicle: 'foo',
                    coach: 'foo',
                    students: ['23123']
                };

                jest.spyOn(model, 'findOne').mockReturnValue(of(mockTraining) as any);

                // Act
                const result = repository.getTrainingLeagueByCicleAndTittle(data);

                // Assert
                expect(await lastValueFrom(result)).toEqual(expectedTraining);
            })

            it('should throw an error if get all fails', async () => {
                // Arrange
                const data: CreateTrainingLeagueDTO = {
                    title: 'foo',
                    cicle: 'foo',
                    coach: 'foo',
                }

                const error = new Error('Error');
                const expectedError = new Error('Error');
                jest.spyOn(model, 'findOne').mockRejectedValue(error as any);

                // Act
                const result = repository.getTrainingLeagueByCicleAndTittle(data);

                // Assert
                await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
            });
        })

        describe('Get by trainingId and StudentId', () => {
            it('should return true', async () => {
                // Arrange
                const trainingId = '123';
                const studentId = '23123';

                const mockTraining = {
                    title: 'foo',
                    cicle: 'foo',
                    coach: 'foo',
                    students: ['23123']
                };
                const expectedTraining = true

                jest.spyOn(model, 'findOne').mockReturnValue(of(mockTraining) as any);

                // Act
                const result = repository.getStudentInTrainingLeague(trainingId, studentId);

                // Assert
                expect(await lastValueFrom(result)).toEqual(expectedTraining);
            })


            it('should return false if the student is not in the training league', async () => {
                // Arrange
                const idTraining = '123';
                const idStudent = '456';
                const error = new Error('Error');
                jest.spyOn(model, 'findOne').mockRejectedValue(error as any);

                // Act
                const result$ = repository.getStudentInTrainingLeague(idTraining, idStudent);

                // Assert
                expect(await lastValueFrom(result$)).toBe(false);
            });
        })
    })
});