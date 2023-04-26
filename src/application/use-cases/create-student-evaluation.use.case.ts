import { Injectable, Inject } from '@nestjs/common';
import { IStudentEvaluationRepository } from '../../domain/repositories/student-evaluation.interface.repository';
import { StudentEvaluationDTO } from '../../domain';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { StudentEvaluationModel } from '../../domain/model/student-evaluation.model';
@Injectable()
export class CreateStudentEvaluationUseCase {
    constructor(
        @Inject('IStudentEvaluationRepository')
        private readonly studentEvaluationRepository: IStudentEvaluationRepository
    ) { }

    execute(data: StudentEvaluationDTO): Observable<StudentEvaluationModel> {
        return this.studentEvaluationRepository.verifyEvaluation(data.trainingLeague, data.student)
            .pipe(
                switchMap((value: boolean) => {
                    if (!value) {
                        console.log('Creando');
                        
                        return this.studentEvaluationRepository.createEvaluation(data)
                            .pipe(
                                map((model: StudentEvaluationModel) => {
                                    return model
                                }),
                                catchError((error: Error) => {
                                    throw new Error(error.message);
                                })
                            )
                    }

                    if(value) {
                        console.log('Actualizando');
                        
                        return this.studentEvaluationRepository.updateEvaluation(data.trainingLeague, data)
                        .pipe(
                            map((model: StudentEvaluationModel) => {
                                console.log('Actualizado');
                                console.log(model);
                                
                                return model
                            }),
                            catchError((error: Error) => {
                                throw new Error(error.message);
                            })
                        )
                    }
                })
            )
    }
}