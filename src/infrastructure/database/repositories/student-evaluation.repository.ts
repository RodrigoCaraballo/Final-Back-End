import { Injectable } from '@nestjs/common';
import { IStudentEvaluationRepository } from '../../../domain/repositories/student-evaluation.interface.repository';
import { Observable, catchError, from, map, of } from 'rxjs';
import { StudentEvaluationDTO, TrainingLeagueModel } from '../../../domain';
import { StudentEvaluationModel } from '../../../domain/model/student-evaluation.model';
import { StudentEvalaution, StudentEvalautionDocument } from '../schemas/student-evaluation.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CriterionAverage } from './interfaces/interfaces.helpers';
@Injectable()
export class StudentEvaluationRepository implements IStudentEvaluationRepository {

  constructor(
    @InjectModel(StudentEvalaution.name)
    private readonly repository: Model<StudentEvalautionDocument>
  ) { }
  createEvaluation(data: StudentEvaluationDTO): Observable<StudentEvaluationModel> {
    return from(this.repository.create(data))
      .pipe(
        map(
          (model: StudentEvaluationModel) => {
            return model
          }),
        catchError((error: Error) => {
          throw new Error(error.message);
        })
      )
  }
  getStudentEvaluation(studentId: string, trainingId: string): Observable<CriterionAverage> {
    return from(
      this.repository.aggregate([
        { $match: { student: studentId, trainingLeague: trainingId } },
        { $unwind: '$evaluations' },
        {
          $group: {
            _id: '$evaluations.criteria',
            average: { $avg: '$evaluations.qualification' }
          }
        },
        {
          $project: {
            _id: 0,
            criteria: '$_id',
            average: 1
          }
        }
      ]))
      .pipe(
        map((model: CriterionAverage) => {
          return model;
        }),
        catchError((error: Error) => {
          throw new Error(error.message);
        }),
      );
  }

  getTrainingEvaluations(trainingId: string): Observable<CriterionAverage[]> {
    return from(this.repository.aggregate([
      { $match: { trainingLeague: trainingId } },
      { $unwind: '$evaluations' },
      {
        $group: {
          _id: '$evaluations.criteria',
          average: { $avg: '$evaluations.qualification' }
        }
      },
      {
        $project: {
          _id: 0,
          criteria: '$_id',
          average: 1
        }
      }
    ])).pipe(
      map((result: CriterionAverage[]) => {
        return result;
      })
    );
  }

  verifyEvaluation(trainingId: string, studentId: string): Observable<boolean> {
    return from(this.repository.findOne({ trainingLeague: trainingId, student: studentId }))
      .pipe(
        map((evaluation: StudentEvaluationModel) => evaluation !== null ? true : false)
      )
  }

  updateEvaluation(trainingId: string, data: StudentEvaluationDTO): Observable<StudentEvaluationModel> {
    return from(this.repository.findOneAndUpdate({ trainingLeague: trainingId }, data, { new: true }))
      .pipe(
        map(
          (evaluation: StudentEvaluationModel) => evaluation),
        catchError((error: Error) => {
          throw new Error(error.message)
        })
      )
  }
}