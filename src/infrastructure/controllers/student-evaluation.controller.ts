import { Controller, Body, Post, Param, Get } from '@nestjs/common';
import { CreateStudentEvaluationUseCase } from '../../application/use-cases/create-student-evaluation.use.case';
import { StudentEvaluationDTO } from '../../domain';
import { Observable, catchError } from 'rxjs';
import { StudentEvaluationModel } from '../../domain/model/student-evaluation.model';
import { GetStudentEvaluationUseCase } from '../../application/use-cases/get-student-evaluation.use.case';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTrainingEvaluationsUseCase } from '../../application/use-cases/get-all-student-evaluations.use-case';
import { CriterionAverage } from '../database/repositories/interfaces/interfaces.helpers';
import { BadRequestSwagger } from '../../swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../swagger/not-found.swagger';
import { IndexStudentEvaluationSwagger } from '../../swagger/index-student-evaluation.swagger';
import { DStudentEvaluationDto } from '../utils/dtos/student-evaluation.dto';

@ApiTags('Student-Controller')
@Controller('student-evaluation')
export class StudentEvaluationController {
  constructor(
    private readonly createEvaluationUseCase: CreateStudentEvaluationUseCase,
    private readonly getStudentEvaluationUseCase: GetStudentEvaluationUseCase,
    private readonly getTrainingEvaluations: GetTrainingEvaluationsUseCase,
  ) {}

  @ApiOperation({
    summary: 'Se crea evaulacion de estudiante',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve la evaluacion creada',
    type: IndexStudentEvaluationSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro evaluacion',
    type: NotFoundSwagger,
  })
  @Post('create')
  createEvaluation(
    @Body() studentEvaluation: DStudentEvaluationDto,
  ): Observable<StudentEvaluationModel> {
    return this.createEvaluationUseCase.execute(studentEvaluation).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }

  @ApiOperation({
    summary: 'Se obtiene evaluacion por id de estudiante',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve la evaluacion obtenida',
    type: IndexStudentEvaluationSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro evaluacion',
    type: NotFoundSwagger,
  })
  @Get('get-one/:studentId/:trainingId')
  getStudentEvaluation(
    @Param('studentId') studentId: string,
    @Param('trainingId') trainingId: string
  ): Observable<CriterionAverage> {
    return this.getStudentEvaluationUseCase.execute(studentId, trainingId).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }

  @ApiOperation({
    summary: 'Se obtiene todas las evaluaciones en el training',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve la lista de evaluaciones obtenida',
    type: IndexStudentEvaluationSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro evaluacion',
    type: NotFoundSwagger,
  })
  @Get('get-all/:trainingId')
  getTrainingEvaluation(
    @Param('trainingId') trainingId: string,
  ): Observable<CriterionAverage[]> {
    return this.getTrainingEvaluations.execute(trainingId).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }
}
