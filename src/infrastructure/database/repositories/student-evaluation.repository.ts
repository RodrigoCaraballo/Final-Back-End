import { Injectable } from '@nestjs/common';
import { IStudentEvaluationRepository } from '../../../domain/repositories/student-evaluation.interface.repository';
import { Observable, catchError, from, map } from 'rxjs';
import { StudentEvaluationDTO, TrainingLeagueModel } from '../../../domain';
import { StudentEvaluationModel } from '../../../domain/model/student-evaluation.model';
import { StudentEvalaution, StudentEvalautionDocument } from '../schemas/student-evaluation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
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
    getStudentEvaluation(studentId: string): Observable<StudentEvaluationModel> {
        return from(
            this.repository.findOne({ student: studentId })
                .populate('trainingLeague')
                // .populate({
                //     path: 'evaluations.criteria',
                //     model: 'Criteria',
                // })
        ).pipe(
            map((model: StudentEvaluationModel) => {
                return model;
            }),
            catchError((error: Error) => {
                throw new Error(error.message);
            }),
        );
    }

    getTrainingEvaluations(trainingId: string): Observable<StudentEvaluationModel[]> {
        return from(
            this.repository.find({ trainingLeague: trainingId })
                .populate({
                    path: 'evaluations.criteria',
                    model: 'Criteria',
                })
                .exec(),
        ).pipe(
            map((model: StudentEvaluationModel[]) => {
                return model;
            }),
            catchError((error: Error) => {
                throw new Error(error.message);
            }),
        );
    }
}