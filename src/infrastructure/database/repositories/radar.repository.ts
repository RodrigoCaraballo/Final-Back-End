import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Observable, catchError, from, map } from "rxjs";
import { Model } from "mongoose";

import { RadarDTO, IRadarModel, IRadarRepository } from "../../../domain";
import { Radar, RadarDocument } from "../schemas/radar.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RadarRepository implements IRadarRepository {

    constructor(
        @InjectModel(Radar.name)
        private readonly repository: Model<RadarDocument>
    ) { }

    createRadar(command: RadarDTO): Observable<IRadarModel> {
        return from(this.repository.create(command))
            .pipe(
                map((radar: IRadarModel) => {
                    return radar
                }),
                catchError(error => {
                    if (error.code === 11000) throw new ConflictException('Radar already exists')
                    else throw new Error(`Generic error: ${error.message}`)
                })
            )
    }
    getRadar(uid: string): Observable<IRadarModel> {
        return from(this.repository.findOne({ uid }))
            .pipe(
                map((radar: IRadarModel) => {
                    return radar
                }),
                catchError(error => {
                    if (error.code === 404) throw new NotFoundException('Radar not found')
                    else throw new Error(`Generic error: ${error.message}`)
                })
            )
    }
    updateRadar(id: string, radar: RadarDTO): Observable<IRadarModel> {
        return from(this.repository.findByIdAndUpdate(id, radar))
            .pipe(
                map((radar: IRadarModel) => {
                    return radar
                }),
                catchError(error => {
                    if (error.code === 404) throw new NotFoundException('Radar not found');
                    if (error.code === 11000) throw new ConflictException('Cannot update radar, radar property already exists')
                    else throw new Error(`Generic error: ${error.message}`)
                })
            )
    }

}