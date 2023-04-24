import { Injectable, Inject } from '@nestjs/common';
import { ITrainingLeagueRepository, IUserModel, IUserRepository, TrainingLeagueModel } from '../../domain';
import { Observable, map, catchError, of, switchMap } from 'rxjs';

@Injectable()
export class AddStudentUseCase {
    constructor(
        @Inject('ITrainingLeagueRepository')
        private readonly trainingLeagueRepository: ITrainingLeagueRepository,
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository
    ) { }

    execute(trainingId: string, studentId: string): Observable<boolean> {
        return this.userRepository.getUserByEmail(studentId)
            .pipe(
                switchMap((user: IUserModel) => {
                    return this.trainingLeagueRepository.addStudent(trainingId, user.id)
                        .pipe(
                            map((training: TrainingLeagueModel) => {
                                if (training) return true;
                            }),
                            catchError(() => {
                                return of(false)
                            })
                        )
                })
            )
    }
}