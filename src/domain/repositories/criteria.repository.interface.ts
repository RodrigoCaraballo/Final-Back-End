import { Observable } from 'rxjs';
import { CriteriaDTO } from '../dto/criteria.dto';
import { CriteriaModel } from '../model';

export interface ICriteriaRepository {
  createCriteria(command: CriteriaDTO): Observable<CriteriaModel>;
  findCriterias(): Observable<CriteriaModel[]>;
  updateCriteria(id: string, command: CriteriaDTO): Observable<CriteriaModel>;
}
