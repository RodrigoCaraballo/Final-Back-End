import { Model } from 'mongoose';
import { Criteria, CriteriaDocument } from '../../schemas';
import { CriteriaRepository } from '../criteria.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { of } from 'rxjs';

describe('CriteriaRepository', () => {
  let repository: CriteriaRepository;
  let model: Model<CriteriaDocument>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CriteriaRepository,
        {
          provide: getModelToken(Criteria.name),
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
    repository = module.get<CriteriaRepository>(CriteriaRepository);
    model = module.get<Model<CriteriaDocument>>(getModelToken(Criteria.name));
  });
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
  describe('Validations', () => {
    // Tests that the createCriteria method successfully creates a new criteria and returns it.
    it('test_create_criteria_successfully_creates_new_criteria_and_returns_it', async () => {
      //Arrange
      const criteriaDTO = {
        name: 'Test Criteria',
        descriptor: 'This is a test criteria',
        area: 'Test Area',
        minQualiRequired: 5,
      };
      jest.spyOn(model, 'create').mockResolvedValue(criteriaDTO as any);
      //Act
      const result = repository.createCriteria(criteriaDTO);
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(criteriaDTO);
        },
      });
    });
    it('test_find_criterias_successfully_retrieves_list_of_criteria_and_returns_it', async () => {
      //Arrange
      const criterias = [
        {
          name: 'Test Criteria',
          descriptor: 'This is a test criteria',
          area: 'Test Area',
          minQualiRequired: 5,
        },
        {
          name: 'Test Criteria',
          descriptor: 'This is a test criteria',
          area: 'Test Area',
          minQualiRequired: 5,
        },
      ];
      jest.spyOn(model, 'find').mockResolvedValue(criterias);
      //Act
      const result = repository.findCriterias();
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(criterias);
        },
      });
    });
    it('test_update_criteria_throws_not_found_exception_if_criteria_with_given_id_is_not_found_and_conflict_exception_if_update_would_result_in_duplicate_property', async () => {
      //Arrange
      const id = '123';
      const criteriaDTO = {
        id: '234',
        name: 'Test Criteria',
        descriptor: 'This is a test criteria',
        area: 'Test Area',
        minQualiRequired: 5,
      };
      const message = 'Criteria not found';
      const mockError = { code: 404, message: 'Criteria not found' };
      jest.spyOn(model, 'findByIdAndUpdate').mockRejectedValue(mockError);
      //Act
      const result = repository.updateCriteria(id, criteriaDTO);
      //Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(message);
        },
      });
    });
    it('test_update_criteria_throws_not_found_exception_if_criteria_with_given_id_is_not_found_and_conflict_exception_if_update_would_result_in_duplicate_property', async () => {
      //Arrange
      const id = '123';
      const criteriaDTO = {
        id: '234',
        name: 'Test Criteria',
        descriptor: 'This is a test criteria',
        area: 'Test Area',
        minQualiRequired: 5,
      };
      const message =
        'Cannot update Criteria, Criteria property already exists';
      const mockError = {
        code: 11000,
        message: 'Cannot update Criteria, Criteria property already exists',
      };
      jest.spyOn(model, 'findByIdAndUpdate').mockRejectedValue(mockError);
      //Act
      const result = repository.updateCriteria(id, criteriaDTO);
      //Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(message);
        },
      });
    });
    it('test_find_criteria_database_error_general_behavior', async () => {
      // Arrange
      const mockError = new Error('Database error');
      const messageError = 'Generic error: Database error';
      jest.spyOn(model, 'find').mockRejectedValue(mockError);
      const result = repository.findCriterias();
      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(messageError);
        },
      });
    });
    it('test_update_user_database_error_general_behavior', async () => {
      // Arrange
      const mockError = new Error('Database error');
      const messageError = 'Generic error: Database error';
      const criteriaDTO = {
        id: '234',
        name: 'Test Criteria',
        descriptor: 'This is a test criteria',
        area: 'Test Area',
        minQualiRequired: 5,
      };
      const id = '123';
      jest.spyOn(model, 'findByIdAndUpdate').mockRejectedValue(mockError);
      const result = repository.updateCriteria(id, criteriaDTO);
      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(messageError);
        },
      });
    });
    it('test_find_criteria_database_error_general_behavior', async () => {
      // Arrange
      const criteriaDTO = {
        name: 'Test Criteria',
        descriptor: 'This is a test criteria',
        area: 'Test Area',
        minQualiRequired: 5,
      };
      const mockError = new Error('Database error');
      const messageError = 'Generic error: Database error';
      jest.spyOn(model, 'create').mockRejectedValue(mockError);
      const result = repository.createCriteria(criteriaDTO);
      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(messageError);
        },
      });
    });
    it('test_update_criteria_sucessfull', async () => {
      //Arrange
      const id = '123';
      const criteriaDTO = {
        id: '234',
        name: 'Test Criteria',
        descriptor: 'This is a test criteria',
        area: 'Test Area',
        minQualiRequired: 5,
      };
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(criteriaDTO);
      //Act
      const result = repository.updateCriteria(id, criteriaDTO);
      //Assert
      result.subscribe({
        next: (data) => {
          expect(data).toEqual(criteriaDTO);
        },
      });
    });
  });
});
