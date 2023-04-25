import { Controller, Body, Post, Param, UseGuards, Get } from '@nestjs/common';
import {
  AddStudentUseCase,
  CreateTrainingLeagueUseCase,
} from '../../application/use-cases/';
import { CreateTrainingLeagueDTO, TrainingLeagueModel } from '../../domain';
import { catchError, Observable } from 'rxjs';
import { AddStudentDTO } from '../../domain/dto/add-student.dto';
import { AddRadarDTO } from 'src/domain/dto/add-radar.dto';
import { AddRadarUseCase } from 'src/application/use-cases/add-radar.use-case';
import { CoachGuard } from '../utils/coach.guard';
import { GetAllTrainingsUseCase } from '../../application/use-cases/get-all-trainings.use-case';
import { GetTrainingLeagueUseCase } from '../../application/use-cases/get-training-league.use-case';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundSwagger } from '../../swagger/not-found.swagger';
import { BadRequestSwagger } from '../../swagger/bad-request.swagger';
import { IndexTrainingLeagueSwagger } from '../../swagger/index-training-league.swagger';
import { EventPattern, Payload } from '@nestjs/microservices';

@ApiTags('Training League- Controller')
@Controller('training-league')
export class TrainingLeagueController {
  constructor(
    private readonly createTrainingLeagueUseCase: CreateTrainingLeagueUseCase,
    private readonly addStudentUseCase: AddStudentUseCase,
    private readonly addRadarUseCase: AddRadarUseCase,
    private readonly getAllUseCase: GetAllTrainingsUseCase,
    private readonly getTrainingLeagueUseCase: GetTrainingLeagueUseCase,
  ) {}
  @ApiOperation({
    summary: 'Se crea training league',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el training League',
    type: IndexTrainingLeagueSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro usuario',
    type: NotFoundSwagger,
  })
  @Post('create')
  @UseGuards(CoachGuard)
  createTrainingLeague(@Body() data: CreateTrainingLeagueDTO) {
    return this.createTrainingLeagueUseCase.execute(data).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }
  @ApiOperation({
    summary: 'Se agrega estudiante',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve un booleano',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro usuario',
    type: NotFoundSwagger,
  })
  @Post('add-student')
  @UseGuards(CoachGuard)
  addStudent(@Body() data: AddStudentDTO): Observable<boolean> {
    return this.addStudentUseCase.execute(data.trainingId, data.studentId);
  }
  @ApiOperation({
    summary: 'Se agrega un radar',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve un booleano',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro usuario',
    type: NotFoundSwagger,
  })
  @Post('add-radar')
  addRadar(@Body() data: AddRadarDTO): Observable<boolean> {
    return this.addRadarUseCase.execute(data);
  }
  @ApiOperation({
    summary: 'Se obtiene todos los training',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve un array de todos los training League',
    type: IndexTrainingLeagueSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro usuario',
    type: NotFoundSwagger,
  })
  @Get('get-all/:coachId?')
  getAllTrainings(
    @Param('coachId') coachId?: string,
  ): Observable<TrainingLeagueModel[]> {
    return this.getAllUseCase.execute(coachId).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }

  @ApiOperation({
    summary: 'Obtiene solo un training por id',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el training League obtenido',
    type: IndexTrainingLeagueSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro usuario',
    type: NotFoundSwagger,
  })
  @Get('get/:id')
  getTraining(@Param('id') id: string): Observable<TrainingLeagueModel> {
    return this.getTrainingLeagueUseCase.execute(id).pipe(
      catchError((error: Error) => {
        throw new Error(error.message);
      }),
    );
  }

  @EventPattern('radar_created')
  handrerRadarCreated(@Payload() data: AddRadarDTO): Observable<boolean> {
    return this.addRadarUseCase.execute(data);
  }
}
