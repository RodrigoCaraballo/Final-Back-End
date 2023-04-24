import { Inject, Injectable } from '@nestjs/common';
import { Observable, map, catchError } from 'rxjs';
import { RadarModel, IRadarRepository, RadarDTO } from '../../domain';

@Injectable()
export class CreateRadarUseCase {
    constructor(
        @Inject('IRadarRepository') private readonly radarRepository: IRadarRepository
    ) { }

    execute(command: RadarDTO): Observable<RadarModel> {
        return this.radarRepository.createRadar(command)
            .pipe(
                map((radar: RadarModel) => {
                    return radar;
                }),
                catchError(error => {
                    throw new Error(error.message)
                })
            )
    }
}