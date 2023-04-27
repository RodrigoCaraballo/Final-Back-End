import { Model } from "mongoose";
import { TrainingLeague } from "../../schemas";
import { TrainingLeagueRepository } from "../training-league.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { CreateTrainingLeagueDTO, StudentEvaluationDTO, TrainingLeagueModel } from "../../../../domain";
import { lastValueFrom, of } from 'rxjs';
import { StudentEvaluationRepository } from "../student-evaluation.repository";
import { StudentEvalaution } from "../../schemas/student-evaluation.schema";
import { CriterionAverage } from "../interfaces/interfaces.helpers";
import { StudentEvaluationModel } from "../../../../domain/model/student-evaluation.model";

describe('Student Evaluation Repository', () => {
    let repository: StudentEvaluationRepository;
    let model: Model<StudentEvalaution>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StudentEvaluationRepository,
                {
                    provide: getModelToken(StudentEvalaution.name),
                    useValue: {
                        create: jest.fn(),
                        aggregate: jest.fn(),
                        findOne: jest.fn(),
                        findOneAndUpdate: jest.fn()
                    },
                },
            ],
        }).compile();
        repository = module.get<StudentEvaluationRepository>(StudentEvaluationRepository);
        model = module.get<Model<StudentEvalaution>>(getModelToken(StudentEvalaution.name));
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('create', () => {
        it('should return a new Student Evaluation', async () => {
            // Arrange
            const evalaution: StudentEvaluationDTO = {
                trainingLeague: '1234',
                student: '12345',
                evaluations: []
            };

            const mockEvaluation = {
                trainingLeague: '1234',
                student: '12345',
                evaluations: []
            };
            const expectedEvalaution = {
                trainingLeague: '1234',
                student: '12345',
                evaluations: []
            };

            jest.spyOn(model, 'create').mockResolvedValue(mockEvaluation as any);

            // Act
            const result = repository.createEvaluation(evalaution);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedEvalaution);
        });

        it('should throw an error if saves fails', async () => {
            // Arrange
            const evalaution: StudentEvaluationDTO = {
                trainingLeague: '1234',
                student: '12345',
                evaluations: []
            };
            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(model, 'create').mockRejectedValue(error);

            // Act
            const result = repository.createEvaluation(evalaution as any);

            // Assert
            await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
        });
    });

    describe('get student evaluation', () => {
        it('returns the student evaluation', async () => {
            // Arrange
            const trainingId = '123';
            const studentId = '23123';

            const mockEvaluation: CriterionAverage = {
                criterion: 'criterion',
                average: 1
            }
            const expectedEvalaution: CriterionAverage = {
                criterion: 'criterion',
                average: 1
            }

            jest.spyOn(model, 'aggregate').mockResolvedValue(mockEvaluation as any);

            // Act
            const result = repository.getStudentEvaluation(studentId, trainingId);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedEvalaution);
        })

        it('should throw an error if saves fails', async () => {
            // Arrange
            const trainingId = '123';
            const studentId = '23123';

            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(model, 'aggregate').mockRejectedValue(error as any);

            // Act
            const result = repository.getStudentEvaluation(studentId, trainingId);

            // Assert
            await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
        });
    })

    describe('verify student evaluation', () => {
        it('returns true', async () => {
            // Arrange
            const trainingId = '123';
            const studentId = '1234'

            const mockEvaluation: StudentEvaluationModel = {
                trainingLeague: '123',
                student: '1234',
                evaluations: []
            }
            const expectedEvalaution = true

            jest.spyOn(model, 'findOne').mockResolvedValue(mockEvaluation as any);

            // Act
            const result = repository.verifyEvaluation(trainingId, studentId);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedEvalaution);
        })

        it('should throw an error if saves fails', async () => {
            // Arrange
            const trainingId = '123';
            const studentId = '1234';
          
            const error = new Error('Error');
            jest.spyOn(model, 'findOne').mockRejectedValue(error);
          
            // Act
            const result$ = repository.verifyEvaluation(trainingId, studentId);
          
            // Assert
            await expect(lastValueFrom(result$)).rejects.toThrowError(error);
          });
    })

    describe('get training evaluation', () => {
        it('returns the student evaluations', async () => {
            // Arrange
            const trainingId = '123';

            const mockEvaluation: CriterionAverage = {
                criterion: 'criterion',
                average: 1
            }
            const expectedEvalaution: CriterionAverage = {
                criterion: 'criterion',
                average: 1
            }

            jest.spyOn(model, 'aggregate').mockResolvedValue([mockEvaluation] as any);

            // Act
            const result = repository.getTrainingEvaluations(trainingId);

            // Assert
            expect(await lastValueFrom(result)).toEqual([expectedEvalaution]);
        })

        it('should throw an error if saves fails', async () => {
            // Arrange
            const trainingId = '123';

            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(model, 'aggregate').mockRejectedValue(error as any);

            // Act
            const result = repository.getTrainingEvaluations(trainingId);

            // Assert
            await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
        });
    })

    describe('update an student evaluation', () => {
        it('should return a Student Evaluation', async () => {
            // Arrange
            const studentEvaluationId = '1234';
            const evaluation: StudentEvaluationDTO = {
                trainingLeague: '1234',
                student: '12345',
                evaluations: []
            };

            const mockEvaluation = {
                trainingLeague: '1234',
                student: '12345',
                evaluations: []
            };
            const expectedEvalaution = {
                trainingLeague: '1234',
                student: '12345',
                evaluations: []
            };

            jest.spyOn(model, 'findOneAndUpdate').mockResolvedValue(mockEvaluation as any);

            // Act
            const result = repository.updateEvaluation(studentEvaluationId, evaluation);

            // Assert
            expect(await lastValueFrom(result)).toEqual(expectedEvalaution);
        });

        it('should throw an error if saves fails', async () => {
            // Arrange
            const studentEvaluationId = '1234';
            const evalaution: StudentEvaluationDTO = {
                trainingLeague: '1234',
                student: '12345',
                evaluations: []
            };
            const error = new Error('Error');
            const expectedError = new Error('Error');
            jest.spyOn(model, 'findOneAndUpdate').mockRejectedValue(error);

            // Act
            const result = repository.updateEvaluation(studentEvaluationId, evalaution);

            // Assert
            await expect(lastValueFrom(result)).rejects.toThrowError(expectedError);
        });
    });
});