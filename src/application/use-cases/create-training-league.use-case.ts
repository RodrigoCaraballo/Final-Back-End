import { Injectable, Inject } from '@nestjs/common';
import { ITrainingLeagueRepository, CreateTrainingLeagueDTO, TrainingLeagueModel } from '../../domain';
import { Observable, map, catchError } from 'rxjs';
@Injectable()
export class CreateTrainingLeagueUseCase {
    constructor(
        @Inject('ITrainingLeagueRepository')
        private readonly trainingLeagueRepository: ITrainingLeagueRepository
    ) {}

    execute(data: CreateTrainingLeagueDTO): Observable<TrainingLeagueModel> {
        return this.trainingLeagueRepository.createTrainingLeague(data)
        .pipe(
            map((model: TrainingLeagueModel) => {
                return model
            }),
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }
}