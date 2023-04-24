import { Injectable, Inject } from '@nestjs/common';
import { ITrainingLeagueRepository, CreateTrainingLeagueDTO, TrainingLeagueModel } from '../../domain';
import { Observable, map, catchError } from 'rxjs';
@Injectable()
export class GetAllTrainingsUseCase {
    constructor(
        @Inject('ITrainingLeagueRepository')
        private readonly trainingLeagueRepository: ITrainingLeagueRepository
    ) {}

    execute(coachId?: string): Observable<TrainingLeagueModel[]> {
        return this.trainingLeagueRepository.getAllTrainingLeagues(coachId)
        .pipe(
            map((model: TrainingLeagueModel[]) => {
                return model
            }),
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }
}