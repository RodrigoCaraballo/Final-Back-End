import { Inject } from "@nestjs/common";
import { IStudentEvaluationRepository } from "../../domain/repositories/student-evaluation.interface.repository";
import { Observable, catchError, map } from "rxjs";
import { StudentEvaluationModel } from "../../domain/model/student-evaluation.model";
import { CriterionAverage } from "../../infrastructure/database/repositories/interfaces/interfaces.helpers";

export class GetTrainingEvaluationsUseCase {
    constructor(
        @Inject('IStudentEvaluationRepository')
        private readonly studentRepository: IStudentEvaluationRepository 
    ) {}

    execute(trainingId: string): Observable<CriterionAverage[]> {
        return this.studentRepository.getTrainingEvaluations(trainingId)
        .pipe(
            map(
                (criterionAverage: CriterionAverage[]) => {
                    return criterionAverage
                }
            ),
            catchError((error: Error) => {
                throw new Error(error.message)
            })
        )
    }
}