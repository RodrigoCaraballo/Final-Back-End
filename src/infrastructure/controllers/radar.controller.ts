import { Controller, Post, Body, Param, Patch } from '@nestjs/common'
import { Observable, catchError } from 'rxjs';
import { CreateRadarUseCase } from '../../application';
import { RadarDTO, RadarModel } from '../../domain';

@Controller('radar')
export class RadarController {

    constructor(
        private readonly createRadarUseCase: CreateRadarUseCase,
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
    addCriteria(@Param() idRadar: string): Observable<RadarModel> {
        return this.loginUseCase.execute(uid)
            .pipe(
                catchError(error => {
                    throw new Error(error.message);
                })
            )
    }
}