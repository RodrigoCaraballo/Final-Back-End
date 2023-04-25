import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable, catchError, from, map } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CriteriaDTO,
  CriteriaModel,
  ICriteriaRepository,
} from '../../../domain';
import { Criteria, CriteriaDocument } from '../schemas/criteria.schema';

@Injectable()
export class CriteriaRepository implements ICriteriaRepository {
  constructor(
    @InjectModel(Criteria.name)
    private readonly repository: Model<CriteriaDocument>,
  ) {}

  createCriteria(command: CriteriaDTO): Observable<CriteriaModel> {
    return from(this.repository.create(command)).pipe(
      map((criteria: CriteriaModel) => {
        return criteria;
      }),
      catchError((error) => {
        throw new Error(`Generic error: ${error.message}`);
      }),
    );
  }

  findCriterias(): Observable<CriteriaModel[]> {
    return from(this.repository.find()).pipe(
      map((criterias: CriteriaDocument[]) => {
        return criterias;
      }),
      catchError((error) => {
        throw new Error(`Generic error: ${error.message}`);
      }),
    );
  }

  updateCriteria(id: string, command: CriteriaDTO): Observable<CriteriaModel> {
    return from(
      this.repository.findByIdAndUpdate(id, command, { new: true }),
    ).pipe(
      map((crite: CriteriaModel) => {
        return crite;
      }),
      catchError((error) => {
        if (error.code === 404)
          throw new NotFoundException('Criteria not found');
        if (error.code === 11000)
          throw new ConflictException(
            'Cannot update Criteria, Criteria property already exists',
          );
        else throw new Error(`Generic error: ${error.message}`);
      }),
    );
  }
}
