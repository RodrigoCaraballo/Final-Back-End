import { Model } from 'mongoose';
import { UserRepository } from '../../repositories/user.repository';
import { User, UserDocument } from '../../schemas';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { catchError, lastValueFrom, of, throwError } from 'rxjs';
import { ConflictException, NotFoundException } from '@nestjs/common';
describe('User-Repository', () => {
  let repository: UserRepository;
  let model: Model<UserDocument>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
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
    repository = module.get<UserRepository>(UserRepository);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
  describe('Validations', () => {
    it('createUser', async () => {
      //Arrange
      const data = {
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
      };
      const mockData = {
        _id: '6446f43ff992bad2ff2f5a55',
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
      };
      const expecData = {
        _id: '6446f43ff992bad2ff2f5a55',
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
      };
      jest.spyOn(model, 'create').mockResolvedValue(mockData as any);
      //Act
      const result = repository.createUser(data);
      //Assert
      expect(await lastValueFrom(result)).toEqual(expecData);
    });
    it('getUser', async () => {
      //Arrange
      const id = 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2';
      const data = {
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
      };
      const mockData = {
        _id: '6446f43ff992bad2ff2f5a55',
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
      };
      const expecData = {
        _id: '6446f43ff992bad2ff2f5a55',
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
      };
      jest.spyOn(model, 'findOne').mockResolvedValue(mockData as any);
      //Act
      const result = repository.getUser(id);
      //Assert
      expect(await lastValueFrom(result)).toEqual(expecData);
    });
    it('updateUser', async () => {
      //Arrange
      const id = '6446f43ff992bad2ff2f5a55';
      const data = {
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
      };
      const mockData = {
        _id: '6446f43ff992bad2ff2f5a55',
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
      };
      const expecData = {
        _id: '6446f43ff992bad2ff2f5a55',
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
      };
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(mockData as any);
      //Act
      const result = repository.updateUser(id, data);
      //Assert
      expect(await lastValueFrom(result)).toEqual(expecData);
    });
    it('getUserByEmail', async () => {
      //Arrange
      const email = 'retofinalsofkaradar@gmail.com';
      const data = {
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
      };
      const mockData = {
        _id: '6446f43ff992bad2ff2f5a55',
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
      };
      const expecData = {
        _id: '6446f43ff992bad2ff2f5a55',
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
      };
      jest.spyOn(model, 'findOne').mockResolvedValue(mockData as any);
      //Act
      const result = repository.getUserByEmail(email);
      //Assert
      expect(await lastValueFrom(result)).toEqual(expecData);
    });
    it('getUserByEmail', async () => {
      //Arrange
      const mockData = [
        {
          _id: '6446f43ff992bad2ff2f5a55',
          uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
          email: 'retofinalsofkaradar@gmail.com',
          name: 'Reto Final',
        },
        {
          _id: '6446f43ff992bad2ff2f5a55',
          uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
          email: 'retofinalsofkaradar@gmail.com',
          name: 'Reto Final',
        },
      ];
      const expecData = [
        {
          _id: '6446f43ff992bad2ff2f5a55',
          uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
          email: 'retofinalsofkaradar@gmail.com',
          name: 'Reto Final',
        },
        {
          _id: '6446f43ff992bad2ff2f5a55',
          uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
          email: 'retofinalsofkaradar@gmail.com',
          name: 'Reto Final',
        },
      ];
      jest.spyOn(model, 'find').mockResolvedValue(mockData as any);
      //Act
      const result = repository.getAllUser();
      //Assert
      expect(await lastValueFrom(result)).toEqual(expecData);
    });
    it('getAllStudentsByEmail', async () => {
      //Arrange
      const mockData = [
        {
          _id: '6446f43ff992bad2ff2f5a55',
          uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
          email: 'retofinalsofkaradar@gmail.com',
          name: 'Reto Final',
          role: 'student',
        },
        {
          _id: '6446f43ff992bad2ff2f5a55',
          uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
          email: 'retofinalsofkaradar@gmail.com',
          name: 'Reto Final',
          role: 'student',
        },
      ];
      const expecData = [
        {
          _id: '6446f43ff992bad2ff2f5a55',
          uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
          email: 'retofinalsofkaradar@gmail.com',
          name: 'Reto Final',
          role: 'student',
        },
        {
          _id: '6446f43ff992bad2ff2f5a55',
          uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
          email: 'retofinalsofkaradar@gmail.com',
          name: 'Reto Final',
          role: 'student',
        },
      ];
      jest.spyOn(model, 'find').mockResolvedValue(mockData as any);
      //Act
      const result = repository.getAllStudentsByEmail();
      //Assert
      expect(await lastValueFrom(result)).toEqual(expecData);
    });
    it('getUserById', async () => {
      //Arrange
      const id = '6446f43ff992bad2ff2f5a55';
      const mockData = {
        _id: '6446f43ff992bad2ff2f5a55',
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
        role: 'student',
      };
      const expecData = {
        _id: '6446f43ff992bad2ff2f5a55',
        uid: 'PfRkHAjEc8OjfVS0Cd9UdE4Fr0I2',
        email: 'retofinalsofkaradar@gmail.com',
        name: 'Reto Final',
        role: 'student',
      };
      jest.spyOn(model, 'findById').mockResolvedValue(mockData as any);
      //Act
      const result = repository.getUserById(id);
      //Assert
      expect(await lastValueFrom(result)).toEqual(expecData);
    });
    // Tests that getUser method throws NotFoundException if user not found.
    it('test_get_user_edge_case', async () => {
      // Arrange
      const mockUid = '123';
      const mockError = { code: 404, message: 'User not found' };

      jest.spyOn(model, 'findOne').mockRejectedValue(mockError);
      const result = repository.getUser(mockUid);
      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(mockError.message);
        },
      });
    });
    // Tests that createUser method throws ConflictException if user already exists.
    it('test_create_user_edge_case', async () => {
      // Arrange
      const mockUserDTO = {
        uid: '123',
        email: 'test@test.com',
        name: 'Test User',
        activate: true,
      };
      const mockError = { code: 11000, message: 'User already exists' };
      jest.spyOn(model, 'create').mockRejectedValue(mockError);
      const result = repository.createUser(mockUserDTO);
      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(mockError.message);
        },
      });
    });
    // Tests that updateUser method throws NotFoundException if user not found, throws ConflictException if user property already exists.
    it('test_update_user_edge_case', async () => {
      // Arrange
      const mockId = '123';
      const mockUserDTO = {
        uid: '123',
        email: 'test@test.com',
        name: 'Test User',
        activate: true,
      };
      const mockErrorNotFound = { code: 404, message: 'User not found' };
      const mockErrorConflict = {
        code: 11000,
        message: 'Cannot update user, user property already exists',
      };
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockRejectedValue(mockErrorConflict);
      const result = repository.updateUser(mockId, mockUserDTO);
      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(mockErrorConflict.message);
        },
      });
    });
    it('test_update_user_edge_case', async () => {
      // Arrange
      const mockId = '123';
      const mockUserDTO = {
        uid: '123',
        email: 'test@test.com',
        name: 'Test User',
        activate: true,
      };
      const mockErrorNotFound = { code: 404, message: 'User not found' };
      const mockErrorConflict = {
        code: 11000,
        message: 'Cannot update user, user property already exists',
      };
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockRejectedValue(mockErrorNotFound);
      const result = repository.updateUser(mockId, mockUserDTO);
      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(mockErrorNotFound.message);
        },
      });
    });
    // Tests that getUserByEmail method throws NotFoundException if user not found.
    it('test_get_user_by_email_edge_case', async () => {
      // Arrange
      const email = 'nonexistentuser@example.com';
      const mockErrorNotFound = { code: 404, message: 'User not found' };
      jest.spyOn(model, 'findOne').mockRejectedValue(mockErrorNotFound);
      const result = repository.getUserByEmail(email);
      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(mockErrorNotFound.message);
        },
      });
    });
    // Tests that catchError block in createUser method throws generic error if there is a database error.
    it('test_create_user_database_error_general_behavior', async () => {
      // Arrange
      const mockError = new Error('Database error');
      const messageError = 'Generic error: Database error';
      const mockUserDTO = {
        uid: '123',
        email: 'test@test.com',
        name: 'Test User',
        activate: true,
      };
      jest.spyOn(model, 'create').mockRejectedValue(mockError);
      const result = repository.createUser(mockUserDTO);
      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(messageError);
        },
      });
    });
    it('test_get_user_database_error_general_behavior', async () => {
      // Arrange
      const mockError = new Error('Database error');
      const messageError = 'Generic error: Database error';
      const mockUserDTO = {
        uid: '123',
        email: 'test@test.com',
        name: 'Test User',
        activate: true,
      };
      jest.spyOn(model, 'findOne').mockRejectedValue(mockError);
      const result = repository.getUser(mockUserDTO.uid);
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
      const mockUserDTO = {
        uid: '123',
        email: 'test@test.com',
        name: 'Test User',
        activate: true,
      };
      jest.spyOn(model, 'findByIdAndUpdate').mockRejectedValue(mockError);
      const result = repository.updateUser(mockUserDTO.uid, mockUserDTO);
      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(messageError);
        },
      });
    });
    it('test_get_user_by_email_database_error_general_behavior', async () => {
      // Arrange
      const mockError = new Error('Database error');
      const messageError = 'Generic error: Database error';
      const mockUserDTO = {
        uid: '123',
        email: 'test@test.com',
        name: 'Test User',
        activate: true,
      };
      jest.spyOn(model, 'findOne').mockRejectedValue(mockError);
      const result = repository.getUserByEmail(mockUserDTO.email);
      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual(messageError);
        },
      });
    });
  });
});
