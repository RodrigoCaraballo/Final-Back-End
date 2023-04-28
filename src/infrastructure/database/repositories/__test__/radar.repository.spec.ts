import { Model } from 'mongoose';
import { Radar, RadarDocument } from '../../schemas';
import { RadarRepository } from '../radar.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { from, of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('RadarRepository', () => {
  let repository: RadarRepository;
  let model: Model<RadarDocument>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RadarRepository,
        {
          provide: getModelToken(Radar.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();
    repository = module.get<RadarRepository>(RadarRepository);
    model = module.get<Model<RadarDocument>>(getModelToken(Radar.name));
  });
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
  describe('Validations', () => {
    // Tests that createRadar method successfully creates a new radar.
    it('test_create_radar_successfully_creates_new_radar', async () => {
      //Arrange
      const radarDTO = {
        name: 'Test Radar',
        trainingId: '123',
        criteria: ['456', '789'],
      };
      const radarModel = {
        _id: '123',
        name: 'Test Radar',
        trainingId: '123',
        criteria: ['456', '789'],
      };
      jest.spyOn(model, 'create').mockResolvedValue(radarModel as any);
      //Act
      const result = repository.createRadar(radarDTO);
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(radarModel);
        },
      });
    });
    // Tests that addCriteria method successfully adds a criteria to a radar.
    it('test_add_criteria_successfully_adds_criteria_to_radar', async () => {
      //Arrange
      const idRadar = '123';
      const idCriteria = '456';
      const radarModel = {
        _id: '123',
        name: 'Test Radar',
        trainingId: '123',
        criteria: ['789'],
      };
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockResolvedValue(radarModel as any);
      //Act
      const result = repository.addCriteria(idRadar, idCriteria);
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(radarModel);
        },
      });
    });
    // Tests that getById method successfully retrieves a radar by id and populates criteria field with criteria names only.
    it('test_get_by_id_successfully_retrieves_radar_by_id', async () => {
      const id = '123';
      const radarDocument = {
        _id: '123',
        name: 'Test Radar',
        trainingId: '123',
        criteria: ['456', '789'],
      };
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(radarDocument),
        }),
      } as any);
      const result = repository.getById(id);
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(radarDocument);
        },
      });
    });
    // Tests that getAllRadars method successfully retrieves all radars.
    it('test_get_all_radars_successfully_retrieves_all_radars', async () => {
      const radarDocuments = [
        {
          _id: '123',
          name: 'Test Radar 1',
          trainingId: '123',
          criteria: ['456', '789'],
        },
        {
          _id: '456',
          name: 'Test Radar 2',
          trainingId: '456',
          criteria: ['123', '789'],
        },
      ];
      jest.spyOn(model, 'find').mockResolvedValue(radarDocuments as any);
      const result = repository.getAllRadars();
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(radarDocuments);
        },
      });
    });
    it('test_create_user_database_error_general_behavior', async () => {
      // Arrange
      const mockError = new Error('Database error');
      const messageError = 'Generic error: Database error';
      const radarDTO = {
        name: 'Test Radar',
        trainingId: '123',
        criteria: ['456', '789'],
      };
      jest.spyOn(model, 'create').mockRejectedValue(mockError);
      const result = repository.createRadar(radarDTO);
      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(messageError);
        },
      });
    });
    // Tests that addCriteria method throws a NotFoundException when an invalid criteria id is passed.
    it('test_add_criteria_invalid_criteria_id', async () => {
      // Arrange
      const invalidCriteriaId = 'invalidId';
      const validRadarId = 'validId';
      const message = 'Radar not found';
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(null);

      // Act & Assert
      const result = repository.addCriteria(validRadarId, invalidCriteriaId);
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(message);
        },
      });
    });
  });
});
