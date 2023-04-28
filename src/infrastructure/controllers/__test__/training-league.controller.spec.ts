import { TrainingLeagueController } from '../training-league.controller';
import { CreateTrainingLeagueUseCase } from '../../../application/use-cases/create-training-league.use-case';
import { AddStudentUseCase } from '../../../application/use-cases/add-student.use-case';
import { AddRadarUseCase } from '../../../application/use-cases/add-radar.use-case';
import { GetAllTrainingsUseCase } from '../../../application/use-cases/get-all-trainings.use-case';
import { GetTrainingLeagueUseCase } from '../../../application/use-cases/get-training-league.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { BadRequestException } from '@nestjs/common';

describe('TrainingLeagueController', () => {
  let controller: TrainingLeagueController;
  let createTrainingLeagueUseCase: CreateTrainingLeagueUseCase;
  let addStudentUseCase: AddStudentUseCase;
  let addRadarUseCase: AddRadarUseCase;
  let getAllUseCase: GetAllTrainingsUseCase;
  let getTrainingLeagueUseCase: GetTrainingLeagueUseCase;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingLeagueController,
        {
          provide: CreateTrainingLeagueUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: AddStudentUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: AddRadarUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetAllTrainingsUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetTrainingLeagueUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();
    controller = module.get<TrainingLeagueController>(TrainingLeagueController);
    createTrainingLeagueUseCase = module.get<CreateTrainingLeagueUseCase>(
      CreateTrainingLeagueUseCase,
    );
    addStudentUseCase = module.get<AddStudentUseCase>(AddStudentUseCase);
    addRadarUseCase = module.get<AddRadarUseCase>(AddRadarUseCase);
    getAllUseCase = module.get<GetAllTrainingsUseCase>(GetAllTrainingsUseCase);
    getTrainingLeagueUseCase = module.get<GetTrainingLeagueUseCase>(
      GetTrainingLeagueUseCase,
    );
  });
  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('Validations', () => {
    it('test_create_training_league_successfully', () => {
      const data = {
        title: 'Test Training League',
        cicle: 'Test Cicle',
        coach: 'Test Coach',
        radar: '',
      };

      jest
        .spyOn(createTrainingLeagueUseCase, 'execute')
        .mockReturnValue(of(data));
      // Act
      const result = controller.createTrainingLeague(data);

      // Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(data);
        },
      });
    });
    it('test_add_student_successfully', () => {
      //Arrange
      const data = { trainingId: '123', studentId: '456' };
      jest.spyOn(addStudentUseCase, 'execute').mockReturnValue(of(true));
      //Act
      const result = controller.addStudent(data);
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(true);
        },
      });
    });
    it('test_add_radar_successfully', () => {
      //Arrange
      const data = { trainingId: '123', radarId: '456' };
      jest.spyOn(addRadarUseCase, 'execute').mockReturnValue(of(true));
      //Act
      const result = controller.addRadar(data);
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(true);
        },
      });
    });
    it('test_get_all_training_successfully', () => {
      //Arrange
      const data = [
        { title: 'Nest', cicle: 'C1', radar: '123', coach: '456' },
        { title: 'Nest', cicle: 'C1', radar: '123', coach: '456' },
      ];
      const id = '456';
      jest.spyOn(getAllUseCase, 'execute').mockReturnValue(of(data));
      //Act
      const result = controller.getAllTrainings(id);
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(data);
        },
      });
    });
    it('test_get_training_successfully', () => {
      //Arrange
      const data = { title: 'Nest', cicle: 'C1', radar: '123', coach: '456' };
      const id = '456';
      jest.spyOn(getTrainingLeagueUseCase, 'execute').mockReturnValue(of(data));
      //Act
      const result = controller.getTraining(id);
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(data);
        },
      });
    });
  });
});
