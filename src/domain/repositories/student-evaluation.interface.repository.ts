import { Observable } from "rxjs";
import { StudentEvaluationModel } from "../model/student-evaluation.model";
import { StudentEvaluationDTO } from "../dto";

export interface IStudentEvaluationRepository {
    createEvaluation(data: StudentEvaluationDTO): Observable<StudentEvaluationModel>;
    getStudentEvaluation(studentId: string): Observable<StudentEvaluationModel>;
    getTrainingEvaluations(trainingId: string): Observable<StudentEvaluationModel[]>
}