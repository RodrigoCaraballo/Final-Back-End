import { Injectable, Inject } from '@nestjs/common';
import { ITrainingLeagueRepository, TrainingLeagueModel } from '../../domain';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable()
export class AddStudentUseCase {
    constructor(
        @Inject('ITrainingLeagueRepository')
        private readonly trainingLeagueRepository: ITrainingLeagueRepository
    ) {}

    execute(trainingId: string, studentId: string): Observable<boolean> {
        return this.trainingLeagueRepository.addStudent(trainingId, studentId)
        .pipe(
            map((training: TrainingLeagueModel) => {
                if(training) return true;
            }),
            catchError(() => {
                return of(false)
            })
        )
    }  
}