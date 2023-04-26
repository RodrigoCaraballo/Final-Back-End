import { Observable } from 'rxjs';
import { TrainingLeagueModel } from '../model/training-league.model';
import { CreateTrainingLeagueDTO } from '../dto/training-league.dto';
export interface ITrainingLeagueRepository {
    createTrainingLeague(data: CreateTrainingLeagueDTO): Observable<TrainingLeagueModel>;
    addStudent(trainingLeagueId: string, studentId: string): Observable<TrainingLeagueModel>;
    addRadar(trainingLeagueId: string, data: TrainingLeagueModel): Observable<TrainingLeagueModel>;
    getAllTrainingLeagues(coachId?: string): Observable<TrainingLeagueModel[]>
    getTrainingLeagueById(trainingLeagueId: string): Observable<TrainingLeagueModel>;
    getTrainingLeagueByCicleAndTittle(data: CreateTrainingLeagueDTO): Observable<TrainingLeagueModel>;
    getStudentInTrainingLeague(idTraining:string,idStudent:string):Observable<boolean>
}