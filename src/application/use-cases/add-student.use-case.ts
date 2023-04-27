import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  ITrainingLeagueRepository,
  IUserModel,
  IUserRepository,
  TrainingLeagueModel,
} from '../../domain';
import {
  Observable,
  map,
  catchError,
  of,
  switchMap,
  mergeMap,
  merge,
} from 'rxjs';

@Injectable()
export class AddStudentUseCase {
  constructor(
    @Inject('ITrainingLeagueRepository')
    private readonly trainingLeagueRepository: ITrainingLeagueRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  execute(trainingId: string, emailStudent: string): Observable<boolean> {
    return this.userRepository.getUserByEmail(emailStudent).pipe(
      switchMap((user: IUserModel) => {
        return this.trainingLeagueRepository
          .getStudentInTrainingLeague(trainingId, user.id)
          .pipe(
            mergeMap((state) => {
              if (state) return of(false);
              else {
                return this.trainingLeagueRepository
                  .addStudent(trainingId, user.id)
                  .pipe(
                    mergeMap((training: TrainingLeagueModel) => {
                      if (training) return of(true);
                    }),
                    catchError(() => {
                      return of(false);
                    }),
                  );
              }
            }),
          );
      }),
      catchError((error) => {
        throw new NotFoundException(error.message);
      }),
    );
  }
}
