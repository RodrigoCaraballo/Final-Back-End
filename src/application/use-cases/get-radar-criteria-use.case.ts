import { Inject, Injectable } from '@nestjs/common';
import { Observable, map, catchError } from 'rxjs';
import { RadarModel, IRadarRepository, RadarDTO } from '../../domain';
import { CriterionAverage } from '../../infrastructure/database/repositories/interfaces/interfaces.helpers';

@Injectable()
export class GetRadarCriteriaUseCase {
    constructor(
        @Inject('IRadarRepository') private readonly radarRepository: IRadarRepository
    ) { }

    execute(id: string): Observable<CriterionAverage[]> {
        return this.radarRepository.getById(id)
            .pipe(
                map((radar) => {
                    return radar.criteria.map((criteria) => ({
                        criterion: criteria,
                        average: 0,
                      }));
                }),
                catchError(error => {
                    throw new Error(error.message)
                })
            )
    }
}