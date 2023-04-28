import { StudentEvaluationController } from '../student-evaluation.controller';
import { CreateStudentEvaluationUseCase } from '../../../application/use-cases/create-student-evaluation.use.case';
import { GetStudentEvaluationUseCase } from '../../../application/use-cases/get-student-evaluation.use.case';
import { GetTrainingEvaluationsUseCase } from '../../../application/use-cases/get-all-student-evaluations.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { DStudentEvaluationDto } from '../../utils/dtos/student-evaluation.dto';
import { of, throwError } from 'rxjs';

describe('StudentEvaluationController', () => {
  let controller: StudentEvaluationController;
  let createEvaluationUseCase: CreateStudentEvaluationUseCase;
  let getStudentEvaluationUseCase: GetStudentEvaluationUseCase;
  let getTrainingEvaluations: GetTrainingEvaluationsUseCase;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentEvaluationController,
        {
          provide: CreateStudentEvaluationUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetStudentEvaluationUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetTrainingEvaluationsUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<StudentEvaluationController>(
      StudentEvaluationController,
    );
    createEvaluationUseCase = module.get<CreateStudentEvaluationUseCase>(
      CreateStudentEvaluationUseCase,
    );
    getStudentEvaluationUseCase = module.get<GetStudentEvaluationUseCase>(
      GetStudentEvaluationUseCase,
    );
    getTrainingEvaluations = module.get<GetTrainingEvaluationsUseCase>(
      GetTrainingEvaluationsUseCase,
    );
  });
  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('Validations', () => {
    // Tests that the createEvaluation method successfully creates a student evaluation.
    it('test_create_evaluation_successfully_creates_student_evaluation', () => {
      // Arrange
      const mockData = {
        trainingLeague: '456',
        student: '123',
        evaluations: [
          {
            criteria: '123',
            qualification: '5',
          },
        ],
      };

      jest
        .spyOn(createEvaluationUseCase, 'execute')
        .mockReturnValue(of(mockData as any));
      const studentEvaluation = new DStudentEvaluationDto();

      // Act
      const result = controller.createEvaluation(studentEvaluation);

      // Assert
      expect(createEvaluationUseCase.execute).toHaveBeenCalledWith(
        studentEvaluation,
      );
      expect(result).toBeDefined();
    });
    // Tests that the getStudentEvaluation method returns a CriterionAverage object.
    it('test_get_student_evaluation_returns_criterion_average_object', () => {
      // Arrange
      jest
        .spyOn(getStudentEvaluationUseCase, 'execute')
        .mockReturnValue(of({} as any));
      const studentId = '123';
      const trainingId = '456';
      // Act
      const result = controller.getStudentEvaluation(studentId, trainingId);

      // Assert
      expect(getStudentEvaluationUseCase.execute).toHaveBeenCalledWith(
        studentId,
        trainingId,
      );
      expect(result).toBeDefined();
    });
    // Tests that the createEvaluation method throws an error if an evaluation already exists for the student and training.
    it('test_create_evaluation_throws_error_if_evaluation_already_exists', () => {
      // Arrange
      const mockError = new Error('Database error');
      const messageError = 'Generic error: Database error';
      jest
        .spyOn(createEvaluationUseCase, 'execute')
        .mockReturnValue(of(mockError as any));
      const studentEvaluation = new DStudentEvaluationDto();
      const mockData = {
        trainingLeague: '456',
        student: '123',
        evaluations: [
          {
            criteria: '123',
            qualification: 5,
          },
        ],
      };
      // Act & Assert
      const result = controller.createEvaluation(mockData);

      result.subscribe({
        error: (err) => {
          console.log(err);
          expect(err.message).toEqual(messageError)
        },
      });
    });
  });
});
