import { Observable } from "rxjs";
import { CriteriaDTO } from "../dto/criteria.dto";
import { CriteriaModel } from "../model";

export interface ICriteriaRepository {

    createCriteria(command: CriteriaDTO): Observable<CriteriaModel>;
}