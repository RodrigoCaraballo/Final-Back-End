import { Inject, Injectable } from "@nestjs/common";

import { Observable, catchError } from 'rxjs';
import { RadarModel, IRadarRepository } from "../../domain";

@Injectable()
export class AddCriteriaUseCase {

    constructor(
        @Inject('IRadarRepository') private radarRepository: IRadarRepository
    ) {}

    execute(idRadar: string, idCriteria: string): Observable<RadarModel> {
        return this.radarRepository.addCriteria(idRadar, idCriteria)
        .pipe(
            catchError(error => {
                throw new Error(error.message)
            })
        )
    }
}