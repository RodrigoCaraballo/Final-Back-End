import { Observable } from "rxjs";
import { RadarDTO } from "../dto/radar.dto";
import { RadarModel } from "../model";

export interface IRadarRepository {

    createRadar(command: RadarDTO): Observable<RadarModel>;
    addCriteria(idRadar: string, idCriteria: string): Observable<RadarModel>;
    getById(id: string): Observable<RadarModel>
    getAllRadars(): Observable<RadarModel[]>
}