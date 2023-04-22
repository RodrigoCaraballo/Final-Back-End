import { Controller, Post, Body, Param, Patch, UseGuards } from '@nestjs/common'
import { Observable, catchError } from 'rxjs';
import { CreateRadarUseCase, AddCriteriaUseCase } from '../../application';
import { RadarDTO, RadarModel } from '../../domain';
import { CreateRadarGuard } from '../utils/guards/create-radar.guard';

@Controller('radar')
export class RadarController {

    constructor(
        private readonly createRadarUseCase: CreateRadarUseCase,
        private readonly addCriteriaUseCase: AddCriteriaUseCase,
    ) { }

    @UseGuards(CreateRadarGuard)
    @Post('create-radar')
    createRadar(@Body() radar: RadarDTO): Observable<RadarModel> {
        return this.createRadarUseCase.execute(radar)
            .pipe(
                catchError(error => {
                    throw new Error(error.message);
                })
            )
    }

    @Patch('add-criteria/:idRadar')
    addCriteria(@Param() idRadar: string, @Body() idCriteria: string): Observable<RadarModel> {
        return this.addCriteriaUseCase.execute(idRadar, idCriteria)
            .pipe(
                catchError(error => {
                    throw new Error(error.message);
                })
            )
    }
}