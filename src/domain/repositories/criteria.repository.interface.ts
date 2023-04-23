import { Observable } from "rxjs";
import { CriteriaDTO } from "../dto/criteria.dto";
import { CriterialModel } from "../model";

export interface ICriteriaRepository {

    createCriteria(command: CriteriaDTO): Observable<CriterialModel>;
}