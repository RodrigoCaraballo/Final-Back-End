import { Injectable, NotFoundException } from "@nestjs/common";
import { Observable, catchError, from, map, of, switchMap } from "rxjs";
import { Model } from "mongoose";

import { RadarDTO, RadarModel, IRadarRepository } from "../../../domain";
import { Radar, RadarDocument } from "../schemas/radar.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RadarRepository implements IRadarRepository {

    constructor(
        @InjectModel(Radar.name)
        private readonly repository: Model<RadarDocument>
    ) { }

    createRadar(command: RadarDTO): Observable<RadarModel> {
        return from(this.repository.create(command))
            .pipe(
                map((radar: RadarModel) => {
                    return radar
                }),
                catchError(error => {
                    throw new Error(`Generic error: ${error.message}`)
                })
            )
    }

    addCriteria(idRadar: string, idCriteria: string): Observable<RadarModel> {
        const filter = { _id: idRadar };
        const update = { criteria: idCriteria};
        return from(this.repository.findOneAndUpdate(
            filter,
            { $push: update },
            { new: true },
        )).pipe(
            switchMap((radar: RadarModel) => {
                if(radar) return of(radar);
                else throw new NotFoundException('Radar not found');
            })
        )
    }

}