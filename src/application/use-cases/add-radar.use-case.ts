import { Injectable, Inject } from '@nestjs/common';
import { ITrainingLeagueRepository, TrainingLeagueModel } from '../../domain';
import { Observable, map, catchError, of, switchMap } from 'rxjs';
import { AddRadarDTO } from 'src/domain/dto/add-radar.dto';

@Injectable()
export class AddRadarUseCase {
    constructor(
        @Inject('ITrainingLeagueRepository')
        private readonly trainingLeagueRepository: ITrainingLeagueRepository
    ) {}

    execute(data: AddRadarDTO): Observable<boolean> {
        return this.trainingLeagueRepository.getTrainingLeagueById(data.trainingId)
        .pipe(
            switchMap((model: TrainingLeagueModel) => {
                model.radar = data.radarId;
                return this.trainingLeagueRepository.addRadar(data.trainingId, model)
                .pipe(
                    map(
                        (model: TrainingLeagueModel) => {
                            if(model) return true
                        }
                    ),
                    catchError(() => {
                        return of(false)
                    })
                )
            })
        )
    }
}