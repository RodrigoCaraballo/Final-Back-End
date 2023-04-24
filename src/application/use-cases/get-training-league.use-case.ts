import { Injectable, Inject } from '@nestjs/common';
import { ITrainingLeagueRepository, CreateTrainingLeagueDTO, TrainingLeagueModel } from '../../domain';
import { Observable, map, catchError } from 'rxjs';
@Injectable()
export class GetTrainingLeagueUseCase {
    constructor(
        @Inject('ITrainingLeagueRepository')
        private readonly trainingLeagueRepository: ITrainingLeagueRepository
    ) {}

    execute(id: string): Observable<TrainingLeagueModel> {
        return this.trainingLeagueRepository.getTrainingLeagueById(id)
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