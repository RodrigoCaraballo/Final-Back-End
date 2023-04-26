import { Injectable } from '@nestjs/common';
import { ITrainingLeagueRepository } from '../../../domain';
import { Observable, catchError, from, map, mergeMap, of } from 'rxjs';
import { CreateTrainingLeagueDTO } from 'src/domain/dto/training-league.dto';
import { TrainingLeagueModel } from 'src/domain/model/training-league.model';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingLeague, TrainingLeagueDocument } from '../schemas/training-league.schema';
import { Model } from 'mongoose';

@Injectable()
export class TrainingLeagueRepository implements ITrainingLeagueRepository {

    constructor(
        @InjectModel(TrainingLeague.name)
        private readonly repository: Model<TrainingLeagueDocument>
    ) {}

    createTrainingLeague(data: CreateTrainingLeagueDTO): Observable<TrainingLeagueModel> {
        return from(this.repository.create(data))
        .pipe(
            map((model: TrainingLeagueModel) => {
                return model
            }),
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }
    addStudent(trainingLeagueId: string, studentId: string): Observable<TrainingLeagueModel> {
        return from(this.repository.findByIdAndUpdate(trainingLeagueId, {$push: {students: studentId}}))
        .pipe(
            map((model: TrainingLeagueModel) => {
                return model;
            }),
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }
    addRadar(trainingLeagueId: string, data: TrainingLeagueModel): Observable<TrainingLeagueModel> {
        return from(this.repository.findByIdAndUpdate(trainingLeagueId, data))
        .pipe(
            map((model: TrainingLeagueModel) => {
                console.log(model.radar);
                return model
            }),
            catchError((error: Error) => {
                console.log(error.message);
                throw new Error(error.message)
            })
        )
    }

    getAllTrainingLeagues(coachId?: string): Observable<TrainingLeagueModel[]> {
        let query = {};

        if (coachId) {
          query = { coach: coachId };
        }

        return from(this.repository.find(query)
        .exec())
        .pipe(
            map((leagues: TrainingLeagueModel[]) => {
                return leagues
            }),
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }

    getTrainingLeagueById(trainingLeagueId: string): Observable<TrainingLeagueModel> {
        return from(this.repository.findById(trainingLeagueId)
        .populate('students')
        .exec())
        .pipe(
            map((model: TrainingLeagueModel) => {
                return model
            }),
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }
    getTrainingLeagueByCicleAndTittle(data:CreateTrainingLeagueDTO):Observable<TrainingLeagueModel>{
        return from(this.repository.findOne({title:data.title, cicle:data.cicle}))
    }
    getStudentInTrainingLeague(idTraining:string,idStudent:string):Observable<boolean>{
        return from(this.repository.findOne({_id:idTraining,students:idStudent})).pipe(
            mergeMap((training)=>{
                if(training) return of(true)
                else return of(false)
            })

        )
    }
}