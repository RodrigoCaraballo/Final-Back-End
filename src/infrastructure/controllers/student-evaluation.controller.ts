import { Controller, Body, Post, Param, Get } from '@nestjs/common';
import { CreateStudentEvaluationUseCase } from '../../application/use-cases/create-student-evaluation.use.case';
import { StudentEvaluationDTO } from '../../domain';
import { Observable, catchError } from 'rxjs';
import { StudentEvaluationModel } from '../../domain/model/student-evaluation.model';
import { GetStudentEvaluationUseCase } from '../../application/use-cases/get-student-evaluation.use.case';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Student-Controller")
@Controller('student-evaluation')
export class StudentEvaluationController {

    constructor(
        private readonly createEvaluationUseCase: CreateStudentEvaluationUseCase,
        private readonly getStudentEvaluationUseCase: GetStudentEvaluationUseCase
    ) {}

    @Post('create')
    createEvaluation(@Body() studentEvaluation: StudentEvaluationDTO): Observable<StudentEvaluationModel> {
        return this.createEvaluationUseCase.execute(studentEvaluation)
        .pipe(
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }

    @Get('get-one/:studentId')
    getStudentEvaluation(@Param('studentId') studentId: string): Observable<StudentEvaluationModel> {
        return this.getStudentEvaluationUseCase.execute(studentId)
        .pipe(
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }
}