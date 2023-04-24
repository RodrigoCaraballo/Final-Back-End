import { Inject, Injectable } from '@nestjs/common';
import { Observable, map, catchError } from 'rxjs';
import { CriteriaModel, ICriteriaRepository, CriteriaDTO } from '../../domain';

@Injectable()
export class CreateCriteriaUseCase {
    constructor(
        @Inject('ICriteriaRepository') private readonly criteriaRepository: ICriteriaRepository
    ) { }

    execute(command: CriteriaDTO): Observable<CriteriaModel> {
        return this.criteriaRepository.createCriteria(command)
            .pipe(
                map((criteria: CriteriaModel) => {
                    return criteria;
                }),
                catchError(error => {
                    throw new Error(error.message)
                })
            )
    }
}