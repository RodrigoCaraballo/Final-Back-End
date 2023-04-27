import { Test, TestingModule } from '@nestjs/testing';
import { Observable, Subscriber, of } from 'rxjs';
import { RadarController } from '../radar.controller';
import { RadarRepository } from '../../../infrastructure/database';

describe('RadarController', () => {
  let controller: RadarController;
  let repository: RadarRepository;

  const _id: string = '641c65deff0153dd0f36bf5';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:
        [
          {
            provide: RadarRepository,
            useValue: {},
          },
        ],
      controllers: [RadarController],
    }).compile();

    controller = module.get<RadarController>(RadarController);
    repository = module.get<RadarRepository>(RadarRepository);
  });

  it('should be defined', (done) => {
    expect(controller).toBeDefined();
    done();
  });

  it('should call repository.find', (done) => {
    // Arrange
    const mockData = new Array<RadarModel>(
      { name: 'pedro', password: 'password' },
      { name: 'juan', password: 'password' },
    );

    const expectedData = new Array<Radar>(
      { name: 'pedro', password: 'password' },
      { name: 'juan', password: 'password' },
    );

    const stubFind = jest.fn(() =>
      new Observable<RadarModel[]>((subscriber: Subscriber<RadarModel[]>) => {
        subscriber.next(mockData);
        subscriber.complete();
      }),
    );

    const expectedInstanceType = Array<Radar>;
    (controller as any).useCase = {
      toFindRadars: jest.fn(),
      execute: stubFind,
    };

    // Act
    const result = controller.find();

    // Assert
    expect(stubFind).toHaveBeenCalled();
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        expect(value).toBeInstanceOf(expectedInstanceType);
        done();
      },
    });
  });

  it('should call repository.create', (done) => {
    // Arrange
    const body: RadarDto =
    {
      name: 'pedro',
      password: 'password'
    };

    const expectedData: Radar =
    {
      _id,
      name: 'pedro',
      password: 'password',
      _version: 0
    };

    const stubCreate = jest.fn((data: RadarDto) =>
      new Observable<RadarModel>((subscriber) => {
        subscriber.next({ ...data, _id, _version: 0 } as RadarModel);
        subscriber.complete();
      }),
    );

    (controller as any).useCase = {
      toCreateRadar: jest.fn(),
      execute: stubCreate,
    };

    // Act
    const result: Observable<Radar> = controller.register(body);

    // Assert
    expect(stubCreate).toHaveBeenCalledWith(body);
    result.subscribe({
      next: (value: Radar) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call repository.update', (done) => {
    // Arrange
    const body: RadarDto = { name: 'pedro' };

    const expectedData: Radar =
    {
      _id,
      name: 'pedro',
      password: 'password',
      _version: 1
    };

    const mockData: Radar =
    {
      _id,
      name: 'pedro',
      password: 'password',
      _version: 1
    };

    const stubUpdate = jest.fn(
      (_id: string, data: RadarDto) =>
        new Observable<RadarModel>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );

    (controller as any).useCase = {
      toUpdateRadar: jest.fn(),
      execute: stubUpdate,
    };

    // Act
    const result: Observable<Radar> = controller.update(_id, body);

    // Assert
    expect(delegate.RadarDelegate).toHaveBeenCalledWith(repository, jwtTokenService);
    expect(stubUpdate).toHaveBeenCalledWith(_id, body);
    result.subscribe({
      next: (value: Radar) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call repository.delete', (done) => {
    // Arrange
    const mockData: Radar =
    {
      _id,
      name: 'pedro',
      password: 'password',
      _version: 0
    };

    const expectedData: Radar =
    {
      _id,
      name: 'pedro',
      password: 'password',
      _version: 0
    };

    const stubDelete = jest.fn(() =>
      new Observable<Radar>((subscriber) => {
        subscriber.next(mockData);
        subscriber.complete();
      }),
    );

    (controller as any).useCase = {
      toDeleteRadar: jest.fn(),
      execute: stubDelete,
    };

    // Act
    const result: Observable<Radar> = controller.delete(_id);

    // Assert
    expect(delegate.RadarDelegate).toHaveBeenCalledWith(repository, jwtTokenService);
    expect(stubDelete).toHaveBeenCalledWith(_id);
    result.subscribe({
      next: (value: Radar) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should login a radar', (done) => {
    // Arrange
    const payload: Radar =
    {
      name: "xtian",
      password: "password"
    };

    const mockJwt: string = "jwt example";

    const mockData: object = { jwt: mockJwt };

    const expectedData: object = { jwt: mockJwt };

    const stubLogin = jest.fn(() =>
      new Observable<object>((subscriber: Subscriber<object>) => {
        subscriber.next(mockData);
        subscriber.complete();
      }),
    );

    (controller as any).useCase = {
      toLogin: jest.fn(),
      execute: stubLogin,
    };

    // Act
    const result: Observable<object> = controller.login(payload);

    // Assert
    result.subscribe({
      next: (data: object) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

});
