import { Model } from 'mongoose';
import { UserRepository } from '../../repositories/user.repository';
import { User, UserDocument } from '../../schemas';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { lastValueFrom, of } from 'rxjs';
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
            getAllStudentsByEmail: jest.fn(),
            getUserById: jest.fn(),
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
  });
});
