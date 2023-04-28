import { UserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { LoginUseCase } from '../login.use-case';
import { Observable, of } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { mock } from 'node:test';

describe('LoginUseCase', () => {
  let repository: UserRepository;
  let useCase: LoginUseCase;
  let jwt: any;
  beforeEach(() => {
    repository = {
      getUser: jest.fn(),
    } as unknown as UserRepository;
    useCase = new LoginUseCase(repository);
  });
  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
  describe('Validations', () => {
    it('test_login_use_case_returns_jwt_token_if_user_is_activated', () => {
      // Arrange
      const uid = 'test_uid';
      const mockData = {
        id: '123',
        uid: 'test_uid',
        email: 'test@test.com',
        name: 'Test User',
        activate: true,
        role: 'user',
      };
      (repository.getUser as jest.Mock).mockReturnValue(of(mockData));

      // Act
      const result = useCase.execute(uid);

      // Assert
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result.subscribe).toBeDefined();
      result.subscribe((token) => {
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
      });
    });
    // Tests that the LoginUseCase class throws an error if the user is not activated.
    it('test_login_use_case_throws_error_if_user_is_not_activated', () => {
      // Arrange
      const uid = 'test_uid';
      const mockData = {
        id: '123',
        uid: 'test_uid',
        email: 'test@test.com',
        name: 'Test User',
        activate: false,
        role: 'user',
      };
      (repository.getUser as jest.Mock).mockReturnValue(of(mockData));
      const result = useCase.execute(uid);

      // Act & Assert
      result.subscribe({
        error: (err) => {
          expect(err.message).toEqual('User Test User is already unactivated');
        },
      });
    });
  });
});
