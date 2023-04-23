import { Injectable } from "@nestjs/common";
import { Observable, catchError, from, map } from "rxjs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CriteriaDTO, CriterialModel, ICriteriaRepository } from "../../../domain";
import { Criteria, CriteriaDocument } from "../schemas/criteria.schema";

@Injectable()
export class CriteriaRepository implements ICriteriaRepository {

    constructor(
        @InjectModel(Criteria.name)
        private readonly repository: Model<CriteriaDocument>
    ) { }

    createCriteria(command: CriteriaDTO): Observable<CriterialModel> {
        return from(this.repository.create(command))
            .pipe(
                map((radar: CriterialModel) => {
                    return radar
                }),
                catchError(error => {
                    throw new Error(`Generic error: ${error.message}`)
                })
            )
    }

}