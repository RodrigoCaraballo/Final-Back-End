import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import {
  ITrainingLeagueRepository,
  CreateTrainingLeagueDTO,
  TrainingLeagueModel,
} from '../../domain';
import { Observable, map, catchError, mergeMap } from 'rxjs';
@Injectable()
export class CreateTrainingLeagueUseCase {
  constructor(
    @Inject('ITrainingLeagueRepository')
    private readonly trainingLeagueRepository: ITrainingLeagueRepository,
  ) {}

  execute(data: CreateTrainingLeagueDTO): Observable<TrainingLeagueModel> {
    return this.trainingLeagueRepository
      .getTrainingLeagueByCicleAndTittle(data)
      .pipe(
        mergeMap((training) => {
          if (training) {
            throw new BadRequestException("There is already a training league with that title and cycle")
          }
          else{
            return this.trainingLeagueRepository.createTrainingLeague(data).pipe(
                map((t)=>{
                    return t
                })
            )
          }
        }),
      );
  }
}
