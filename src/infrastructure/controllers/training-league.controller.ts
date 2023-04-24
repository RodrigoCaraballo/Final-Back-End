import { Controller, Body, Post, Param, UseGuards, Get } from '@nestjs/common';
import { AddStudentUseCase, CreateTrainingLeagueUseCase } from '../../application/use-cases/';
import { CreateTrainingLeagueDTO, TrainingLeagueModel } from '../../domain';
import { catchError, Observable } from 'rxjs';
import { AddStudentDTO } from '../../domain/dto/add-student.dto';
import { AddRadarDTO } from 'src/domain/dto/add-radar.dto';
import { AddRadarUseCase } from 'src/application/use-cases/add-radar.use-case';
import { CoachGuard } from '../utils/coach.guard';
import { GetAllTrainingsUseCase } from '../../application/use-cases/get-all-trainings.use-case';
@Controller('training-league')
export class TrainingLeagueController {

    constructor(
        private readonly createTrainingLeagueUseCase: CreateTrainingLeagueUseCase,
        private readonly addStudentUseCase: AddStudentUseCase,
        private readonly addRadarUseCase: AddRadarUseCase,
        private readonly getAllUseCase: GetAllTrainingsUseCase
        ) {}

    @Post('create')
    @UseGuards(CoachGuard)
    createTrainingLeague(@Body() data: CreateTrainingLeagueDTO) {
        return this.createTrainingLeagueUseCase.execute(data)
        .pipe(
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }

    @Post('add-student')
    @UseGuards(CoachGuard)
    addStudent(@Body() data: AddStudentDTO): Observable<boolean> {
        return this.addStudentUseCase.execute(data.trainingId, data.studentId)
    }

    @Post('add-radar')
    addRadar(@Body() data: AddRadarDTO): Observable<boolean> {
        return this.addRadarUseCase.execute(data)
    }

    @Get('get-all/:coachId?')
    getAllTrainings(@Param('coachId') coachId?: string): Observable<TrainingLeagueModel[]> {
        return this.getAllUseCase.execute(coachId)
        .pipe(
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }
}