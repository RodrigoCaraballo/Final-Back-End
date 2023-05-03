import { Inject, Injectable } from '@nestjs/common';
import { Observable, map, catchError } from 'rxjs';
import { CriteriaModel, ICriteriaRepository, CriteriaDTO } from '../../domain';

@Injectable()
export class GetCriteriasUseCase {
    constructor(
        @Inject('ICriteriaRepository') private readonly criteriaRepository: ICriteriaRepository
    ) { }

    execute(): Observable<CriteriaModel[]> {
        return this.criteriaRepository.findCriterias()
            .pipe(
                map((criterias: CriteriaModel[]) => {
                    return criterias;
                }),
                catchError(error => {
                    throw new Error(error.message)
                })
            )
    }
}