import { Inject, Injectable } from '@nestjs/common';
import { Observable, map, catchError } from 'rxjs';
import { CriterialModel, ICriteriaRepository, CriteriaDTO } from '../../domain';

@Injectable()
export class CreateCriteriaUseCase {
    constructor(
        @Inject('ICriteriaRepository') private readonly radarRepository: ICriteriaRepository
    ) { }

    execute(command: CriteriaDTO): Observable<CriterialModel> {
        return this.radarRepository.createCriteria(command)
            .pipe(
                map((radar: CriterialModel) => {
                    return radar;
                }),
                catchError(error => {
                    throw new Error(error.message)
                })
            )
    }
}