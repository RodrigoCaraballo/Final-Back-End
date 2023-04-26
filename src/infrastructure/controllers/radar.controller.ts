import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Get,
  Put,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';

import {
  CreateRadarUseCase,
  AddCriteriaUseCase,
  CreateCriteriaUseCase,
  GetCriteriasUseCase,
} from '../../application';
import { CriteriaDTO, CriteriaModel, RadarDTO, RadarModel } from '../../domain';
import { LiderGuard } from '../utils/guards/lider.guard';
import { RadarCreatedPublisher } from '../messaging/publisher/radar-created.publisher';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateCriteriaUseCase } from '../../application/use-cases/update-criteria.use-case';
import { GetRadarCriteriaUseCase } from '../../application/use-cases/get-radar-criteria-use.case';
import { CriterionAverage } from '../database/repositories/interfaces/interfaces.helpers';
import { IndexUserSwagger } from '../../swagger/index-user.swagger';
import { BadRequestSwagger } from '../../swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../swagger/not-found.swagger';
import { GetAllRadarsUseCase } from '../../application/use-cases/get-all-radars.use-case';
import { IndexRadarSwagger } from '../../swagger/index-radar.swagger';

@ApiTags('Radar-Controller')
@Controller('radar')
export class RadarController {
  constructor(
    private readonly createRadarUseCase: CreateRadarUseCase,
    private readonly createCriteriaUseCase: CreateCriteriaUseCase,
    private readonly getCriteriasUseCase: GetCriteriasUseCase,
    private readonly addCriteriaUseCase: AddCriteriaUseCase,
    private readonly radarCreatedPublisher: RadarCreatedPublisher,
    private readonly updateCriteriaUseCase: UpdateCriteriaUseCase,
    private readonly getRadarCriteriaUseCase: GetRadarCriteriaUseCase,
    private readonly getAllRadarsUseCase: GetAllRadarsUseCase,
  ) {}

  @ApiOperation({
    summary: 'Se crea un radar',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el radar creado',
    type: IndexRadarSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro radar',
    type: NotFoundSwagger,
  })
  @UseGuards(LiderGuard)
  @Post('create-radar')
  createRadar(@Body() radar: RadarDTO): Observable<RadarModel> {
    return this.createRadarUseCase.execute(radar).pipe(
      tap((radar: RadarModel) => this.radarCreatedPublisher.publish(radar)),
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }
  @ApiOperation({
    summary: 'Se crea un criterio',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el criterio creado',
    type: IndexRadarSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro criterio',
    type: NotFoundSwagger,
  })
  @UseGuards(LiderGuard)
  @Post('create-criteria')
  createCriteria(@Body() criteria: CriteriaDTO): Observable<CriteriaModel> {
    return this.createCriteriaUseCase.execute(criteria).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  @ApiOperation({
    summary: 'Se obtiene criterios',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve la lista de criterios',
    type: IndexRadarSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro criterio',
    type: NotFoundSwagger,
  })
  @UseGuards(LiderGuard)
  @Get('get-criterias')
  getCriterias(): Observable<CriteriaModel[]> {
    return this.getCriteriasUseCase.execute().pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }
  @ApiOperation({
    summary: 'Se agrega criterio a radar',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el radar con su nuevo criterio',
    type: IndexRadarSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro radar',
    type: NotFoundSwagger,
  })
  @UseGuards(LiderGuard)
  @Patch('add-criteria/:idRadar/:idCriteria')
  addCriteria(
    @Param('idRadar') idRadar: string,
    @Param('idCriteria') idCriteria: string,
  ): Observable<RadarModel> {
    return this.addCriteriaUseCase.execute(idRadar, idCriteria).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }
  @ApiOperation({
    summary: 'Se actualiza criterio',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el criterio actualizado',
    type: IndexRadarSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro criterio',
    type: NotFoundSwagger,
  })
  @Put('update-criteria/:id')
  updateCriteria(
    @Param('id') id: string,
    @Body() command: CriteriaDTO,
  ): Observable<CriteriaModel> {
    return this.updateCriteriaUseCase.execute(id, command).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  @ApiOperation({
    summary: 'Se obtiene el promedio del criterio',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el criterio',
    type: IndexRadarSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro criterio',
    type: NotFoundSwagger,
  })
  @Get('get-radar/:id')
  getById(@Param('id') id: string): Observable<CriterionAverage[]> {
    return this.getRadarCriteriaUseCase.execute(id).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  @ApiOperation({
    summary: 'Se encuentra todos los radares',
  })
  @ApiResponse({
    status: 200,
    description: 'Los radares encontrados',
    type: IndexRadarSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontro radar',
    type: NotFoundSwagger,
  })
  @Get('')
  getAllRadar() {
    return this.getAllRadarsUseCase.execute();
  }
}
