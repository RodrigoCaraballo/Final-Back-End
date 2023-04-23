import { Controller, Post, Body, Param, Patch, UseGuards } from '@nestjs/common'
import { Observable, catchError, tap } from 'rxjs';

import { CreateRadarUseCase, AddCriteriaUseCase, CreateCriteriaUseCase } from '../../application';
import { CriteriaDTO, CriteriaModel, RadarDTO, RadarModel } from '../../domain';
import { LiderGuard } from '../utils/guards/lider.guard';
import { RadarCreatedPublisher } from '../messaging/publisher/radar-created.publisher';

@Controller('radar')
export class RadarController {

    constructor(
        private readonly createRadarUseCase: CreateRadarUseCase,
        private readonly createCriteriaUseCase: CreateCriteriaUseCase,
        private readonly addCriteriaUseCase: AddCriteriaUseCase,
        private readonly radarCreatedPublisher: RadarCreatedPublisher,
    ) { }

    @UseGuards(LiderGuard)
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
    @UseGuards(LiderGuard)
    @Post('create-criteria')
    createCriteria(@Body() criteria: CriteriaDTO): Observable<CriteriaModel> {
        return this.createCriteriaUseCase.execute(criteria)
            .pipe(
                catchError(error => {
                    throw new Error(error.message);
                })
            )
    }

    @UseGuards(LiderGuard)
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