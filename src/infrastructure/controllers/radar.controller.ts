import { Controller, Post, Body, Param, Patch } from '@nestjs/common'
import { Observable, catchError } from 'rxjs';
import { CreateRadarUseCase, AddCriteriaUseCase } from '../../application';
import { RadarDTO, RadarModel } from '../../domain';

@Controller('radar')
export class RadarController {

    constructor(
        private readonly createRadarUseCase: CreateRadarUseCase,
        private readonly addCriteriaUseCase: AddCriteriaUseCase,
    ) { }

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