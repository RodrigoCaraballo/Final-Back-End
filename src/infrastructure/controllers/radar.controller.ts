import { Controller, Post, Body, Param, Patch, UseGuards } from '@nestjs/common'
import { Observable, catchError, tap } from 'rxjs';

import { CreateRadarUseCase, AddCriteriaUseCase, CreateCriteriaUseCase } from '../../application';
import { CriteriaDTO, CriterialModel, RadarDTO, RadarModel } from '../../domain';
import { CreateRadarGuard } from '../utils/guards/create-radar.guard';
import { RadarCreatedPublisher } from '../messaging/publisher/radar-created.publisher';

@Controller('radar')
export class RadarController {

    constructor(
        private readonly createRadarUseCase: CreateRadarUseCase,
        private readonly createCriteriaUseCase: CreateCriteriaUseCase,
        private readonly addCriteriaUseCase: AddCriteriaUseCase,
        private readonly radarCreatedPublisher: RadarCreatedPublisher,
    ) { }

    @UseGuards(CreateRadarGuard)
    @Post('create-radar')
    createRadar(@Body() radar: RadarDTO): Observable<RadarModel> {
        return this.createRadarUseCase.execute(radar)
            .pipe(
                tap((radar: RadarModel) => this.radarCreatedPublisher.publish(radar)),
                catchError(error => {
                    throw new Error(error.message);
                })
            )
    }

    @Post('create-criteria')
    createCriteria(@Body() criteria: CriteriaDTO): Observable<CriterialModel> {
        return this.createCriteriaUseCase.execute(criteria)
            .pipe(
                catchError(error => {
                    throw new Error(error.message);
                })
            )
    }

    @Patch('add-criteria/:idRadar/:idCriteria')
    addCriteria(
        @Param('idRadar') idRadar: string,
        @Param('idCriteria') idCriteria: string
    ): Observable<RadarModel> {
        return this.addCriteriaUseCase.execute(idRadar, idCriteria)
            .pipe(
                catchError(error => {
                    throw new Error(error.message);
                })
            )
    }
}