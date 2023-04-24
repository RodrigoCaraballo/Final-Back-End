import { Injectable, Inject } from '@nestjs/common';
import { IStudentEvaluationRepository } from '../../domain/repositories/student-evaluation.interface.repository';
import { StudentEvaluationDTO } from '../../domain';
import { Observable, catchError, map } from 'rxjs';
import { StudentEvaluationModel } from '../../domain/model/student-evaluation.model';
@Injectable()
export class GetStudentEvaluationUseCase {
    constructor(
        @Inject('IStudentEvaluationRepository') 
        private readonly studentEvaluationRepository: IStudentEvaluationRepository
    ) {}

    execute(studentId: string): Observable<StudentEvaluationModel> {
        return this.studentEvaluationRepository.getStudentEvaluation(studentId)
        .pipe(
            map((model: StudentEvaluationModel) => {
                return model
            }),
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }
}