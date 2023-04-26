import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  ITrainingLeagueRepository,
  IUserModel,
  IUserRepository,
  TrainingLeagueModel,
} from '../../domain';
import { Observable, map, catchError, of, switchMap, mergeMap } from 'rxjs';

@Injectable()
export class AddStudentUseCase {
  constructor(
    @Inject('ITrainingLeagueRepository')
    private readonly trainingLeagueRepository: ITrainingLeagueRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  execute(trainingId: string, studentId: string): Observable<boolean> {
    return this.trainingLeagueRepository
      .getStudentInTrainingLeague(trainingId, studentId)
      .pipe(
        mergeMap((state) => {
          if (state) {
            return of(false);
          } else {
            return this.userRepository.getUserById(studentId).pipe(
              switchMap((user: IUserModel) => {
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
              }),
              catchError((error) => {
                throw new NotFoundException(error.message);
              }),
            );
          }
        }),
      );
  }
  // return this.userRepository.getUserByEmail(studentId)
  //         .pipe(
  //             switchMap((user: IUserModel) => {
  //                 return this.trainingLeagueRepository.addStudent(trainingId, user.id)
  //                     .pipe(
  //                         map((training: TrainingLeagueModel) => {
  //                             if (training) return true;
  //                         }),
  //                         catchError(() => {
  //                             return of(false)
  //                         })
  //                     )
  //             }),
  //             catchError((error) => {
  //                 throw new NotFoundException(error.message)
  //             })
  //         )
}
