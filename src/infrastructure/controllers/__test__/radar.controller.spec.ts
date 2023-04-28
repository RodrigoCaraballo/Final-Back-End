import { Test, TestingModule } from '@nestjs/testing';
import { from, of } from 'rxjs';
import { RadarController } from '../radar.controller';
import { AddCriteriaUseCase, CreateCriteriaUseCase, CreateRadarUseCase, GetCriteriasUseCase } from '../../../application';
import { CriteriaDTO, CriteriaModel, RadarModel } from '../../../domain';
import { GetAllRadarsUseCase } from '../../../application/use-cases/get-all-radars.use-case';
import { GetRadarCriteriaUseCase } from '../../../application/use-cases/get-radar-criteria-use.case';
import { UpdateCriteriaUseCase } from '../../../application/use-cases/update-criteria.use-case';
import { RadarCreatedPublisher } from '../../../infrastructure/messaging/publisher/radar-created.publisher';
import { CriterionAverage } from 'src/infrastructure/database/repositories/interfaces/interfaces.helpers';

describe('RadarController', () => {
  let controller: RadarController;
  let createRadarUseCase: CreateRadarUseCase;
  let createCriteriaUseCase: CreateCriteriaUseCase;
  let getCriteriasUseCase: GetCriteriasUseCase;
  let addCriteriaUseCase: AddCriteriaUseCase;
  let radarCreatedPublisher: RadarCreatedPublisher;
  let updateCriteriaUseCase: UpdateCriteriaUseCase;
  let getRadarCriteriaUseCase: GetRadarCriteriaUseCase;
  let getAllRadarsUseCase: GetAllRadarsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadarController],
      providers: [
        {provide: CreateRadarUseCase, useValue: { execute: jest.fn() } },
        {provide: CreateCriteriaUseCase, useValue: { execute: jest.fn() } },
        {provide: GetCriteriasUseCase, useValue: { execute: jest.fn() } },
        {provide: AddCriteriaUseCase, useValue: { execute: jest.fn() } },
        {provide: RadarCreatedPublisher, useValue: { publish: jest.fn() } },
        {provide: UpdateCriteriaUseCase, useValue: { execute: jest.fn() } },
        {provide: GetRadarCriteriaUseCase, useValue: { execute: jest.fn() } },
        {provide: GetAllRadarsUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<RadarController>(RadarController);
    createRadarUseCase = module.get<CreateRadarUseCase>(CreateRadarUseCase);
    createCriteriaUseCase = module.get<CreateCriteriaUseCase>(CreateCriteriaUseCase);
    getCriteriasUseCase = module.get<GetCriteriasUseCase>(GetCriteriasUseCase);
    addCriteriaUseCase = module.get<AddCriteriaUseCase>(AddCriteriaUseCase);
    radarCreatedPublisher = module.get<RadarCreatedPublisher>(RadarCreatedPublisher);
    updateCriteriaUseCase = module.get<UpdateCriteriaUseCase>(UpdateCriteriaUseCase);
    getRadarCriteriaUseCase = module.get<GetRadarCriteriaUseCase>(GetRadarCriteriaUseCase);
    getAllRadarsUseCase = module.get<GetAllRadarsUseCase>(GetAllRadarsUseCase);
    
  });

  describe('createRadar', () => {
    const radar: RadarModel = {
      name: 'radar 1',
      trainingId: '12345',
      criteria: ['23456', '34567', '45678']
    };

    it('should create a new radar', (done) => {
      // Arrange
      const expectedResult: RadarModel = {} as RadarModel;
      jest
        .spyOn(createRadarUseCase, 'execute')
        .mockReturnValueOnce(of(expectedResult));

      // Act
      controller.createRadar(radar).subscribe((result: RadarModel) => {
        // Assert
        expect(result).toBe(expectedResult);
        expect(createRadarUseCase.execute).toHaveBeenCalledWith(radar);
        done();
      });
    });

    it('should throw an error if createRadarUseCase throws an error', (done) => {
      // Arrange
      const error = new Error('Some error message');
      
      jest
        .spyOn(createRadarUseCase, 'execute')
        .mockReturnValueOnce(of(undefined).pipe(() => from(Promise.reject(error))));

      // Act
      controller.createRadar(radar).subscribe({
        error:(err: Error) => {
          // Assert
          expect(err).toEqual(error);
          expect(createRadarUseCase.execute).toHaveBeenCalledWith(radar);
          done();
        }
      });
    });

  });

  describe('createCriteria', () => {
    const criteria: CriteriaModel = {
      descriptor: 'descriptor1',
      name: 'name1',
      area: 'area1',
      minQualiRequired: 4
    };

    it('should create a new criteria', (done) => {
      // Arrange
      const expectedResult: CriteriaModel = {} as CriteriaModel;
      jest
        .spyOn(createCriteriaUseCase, 'execute')
        .mockReturnValueOnce(of(expectedResult));

      // Act
      controller.createCriteria(criteria).subscribe((result: CriteriaModel) => {
        // Assert
        expect(result).toBe(expectedResult);
        expect(createCriteriaUseCase.execute).toHaveBeenCalledWith(criteria);
        done();
      });
    });

    it('should throw an error if createCriteriaUseCase throws an error', (done) => {
      // Arrange
      const error = new Error('Some error message');
      
      jest
        .spyOn(createCriteriaUseCase, 'execute')
        .mockReturnValueOnce(of(undefined).pipe(() => from(Promise.reject(error))));

      // Act
      controller.createCriteria(criteria).subscribe({
        error:(err: Error) => {
          // Assert
          expect(err).toEqual(error);
          expect(createCriteriaUseCase.execute).toHaveBeenCalledWith(criteria);
          done();
        }
      });
    });

  });

  describe('getCriterias', () => {
    const criterias: CriteriaModel[] = [
      {
        descriptor: 'descriptor1',
        name: 'name1',
        area: 'area1',
        minQualiRequired: 4
      },
      {
        descriptor: 'descriptor2',
        name: 'name2',
        area: 'area2',
        minQualiRequired: 3.5
      }
    ];

    it('should create a new criteria', (done) => {
      // Arrange
      const expectedResult: CriteriaModel[] = criterias;
      
      jest
        .spyOn(getCriteriasUseCase, 'execute')
        .mockReturnValueOnce(of(expectedResult));

      // Act
      controller.getCriterias().subscribe((result: CriteriaModel[]) => {
        // Assert
        expect(result).toBe(expectedResult);
        expect(getCriteriasUseCase.execute).toHaveBeenCalled();
        done();
      });
    });

    it('should throw an error if getCriteriasUseCase throws an error', (done) => {
      // Arrange
      const error = new Error('Some error message');
      
      jest
        .spyOn(getCriteriasUseCase, 'execute')
        .mockReturnValueOnce(of(undefined).pipe(() => from(Promise.reject(error))));

      // Act
      controller.getCriterias().subscribe({
        error:(err: Error) => {
          // Assert
          expect(err).toEqual(error);
          expect(getCriteriasUseCase.execute).toHaveBeenCalled();
          done();
        }
      });
    });

  });

  describe('addCriteria', () => {
    const radar: RadarModel = {
      name: 'radar 1',
      trainingId: '12345',
      criteria: ['23456', '34567', '45678']
    };

    const radarId: string = '12345';
    const criteriaId: string = '23456';

    it('should add a criteria to a created radar', (done) => {
      // Arrange
      const expectedResult: RadarModel = radar;
      jest
        .spyOn(addCriteriaUseCase, 'execute')
        .mockReturnValueOnce(of(expectedResult));

      // Act
      controller.addCriteria(radarId, criteriaId).subscribe((result: RadarModel) => {
        // Assert
        expect(result).toBe(expectedResult);
        expect(addCriteriaUseCase.execute).toHaveBeenCalledWith(radarId, criteriaId);
        done();
      });
    });

    it('should throw an error if addCriteriaUseCase throws an error', (done) => {
      // Arrange
      const error = new Error('Some error message');
      
      jest
        .spyOn(addCriteriaUseCase, 'execute')
        .mockReturnValueOnce(of(undefined).pipe(() => from(Promise.reject(error))));

      // Act
      controller.addCriteria(radarId, criteriaId).subscribe({
        error:(err: Error) => {
          // Assert
          expect(err).toEqual(error);
          expect(addCriteriaUseCase.execute).toHaveBeenCalledWith(radarId, criteriaId);
          done();
        }
      });
    });

  });

  describe('updateCriteria', () => {
    const command: CriteriaDTO = {
      descriptor: 'descriptor1',
      name: 'name1',
      area: 'area1',
      minQualiRequired: 4
    };

    const criteriaId: string = '98765';

    it('should update a criteria', (done) => {
      // Arrange
      const expectedResult: CriteriaModel = {
        descriptor: 'newDescriptor',
        name: 'newName',
        area: 'newArea',
        minQualiRequired: 3.5
      };

      jest
        .spyOn(updateCriteriaUseCase, 'execute')
        .mockReturnValueOnce(of(expectedResult));

      // Act
      controller.updateCriteria(criteriaId, command).subscribe((result: CriteriaModel) => {
        // Assert
        expect(result).toBe(expectedResult);
        expect(updateCriteriaUseCase.execute).toHaveBeenCalledWith(criteriaId, command);
        done();
      });
    });

    it('should throw an error if updateCriteriaUseCase throws an error', (done) => {
      // Arrange
      const error = new Error('Some error message');
      
      jest
        .spyOn(updateCriteriaUseCase, 'execute')
        .mockReturnValueOnce(of(undefined).pipe(() => from(Promise.reject(error))));

      // Act
      controller.updateCriteria(criteriaId, command).subscribe({
        error:(err: Error) => {
          // Assert
          expect(err).toEqual(error);
          expect(updateCriteriaUseCase.execute).toHaveBeenCalledWith(criteriaId, command);
          done();
        }
      });
    });

  });

  describe('getRadarCriteria', () => {
    const criterionAverage: CriterionAverage[] = [
      {
        criterion: 'criteria1',
        average: 0
      },
      {
        criterion: 'criteria2',
        average: 0
      }
    ];

    const radarId: string = '1289';

    it('should get all radars', (done) => {
      // Arrange
      const expectedResult: CriterionAverage[] = criterionAverage;
      
      jest
        .spyOn(getRadarCriteriaUseCase, 'execute')
        .mockReturnValueOnce(of(expectedResult));

      // Act
      controller.getById(radarId).subscribe((result: CriterionAverage[]) => {
        // Assert
        expect(result).toBe(expectedResult);
        expect(getRadarCriteriaUseCase.execute).toHaveBeenCalledWith(radarId);
        done();
      });
    });

    it('should throw an error if getRadarCriteriaUseCase throws an error', (done) => {
      // Arrange
      const error = new Error('Some error message');
      
      jest
        .spyOn(getRadarCriteriaUseCase, 'execute')
        .mockReturnValueOnce(of(undefined).pipe(() => from(Promise.reject(error))));

      // Act
      controller.getById(radarId).subscribe({
        error:(err: Error) => {
          // Assert
          expect(err).toEqual(error);
          expect(getRadarCriteriaUseCase.execute).toHaveBeenCalledWith(radarId);
          done();
        }
      });
    });

  });

  describe('getAllRadar', () => {
    const radars: RadarModel[] = [
      {
        name: 'radar 1',
        trainingId: '12345',
        criteria: ['23456', '34567', '45678']
      },
      {
        name: 'radar 2',
        trainingId: '23456',
        criteria: ['34567', '45678']
      }
    ];

    it('should get all radars', (done) => {
      // Arrange
      const expectedResult: RadarModel[] = radars;
      
      jest
        .spyOn(getAllRadarsUseCase, 'execute')
        .mockReturnValueOnce(of(expectedResult));

      // Act
      controller.getAllRadar().subscribe((result: RadarModel[]) => {
        // Assert
        expect(result).toBe(expectedResult);
        expect(getAllRadarsUseCase.execute).toHaveBeenCalled();
        done();
      });
    });

  });

});
