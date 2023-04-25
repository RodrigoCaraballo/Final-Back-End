import { Injectable, NotFoundException } from "@nestjs/common";
import { Observable, catchError, from, map, of, switchMap } from "rxjs";
import { Model } from "mongoose";
const { ObjectId } = require('mongodb');


import { RadarDTO, RadarModel, IRadarRepository } from "../../../domain";
import { Radar, RadarDocument } from "../schemas/radar.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CriterionAverage } from "./interfaces/interfaces.helpers";

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
        const update = { criteria: idCriteria };
        return from(this.repository.findByIdAndUpdate(
            idRadar,
            { $push: update },
            { new: true },
        )).pipe(
            switchMap((radar: RadarModel) => {
                if (radar) return of(radar);
                else throw new NotFoundException('Radar not found');
            })
        )
    }

    getById(id: string): Observable<RadarModel> {
        return from(this.repository.findById(id)
            .populate({ path: 'criteria', model: 'Criteria', select: 'name -_id' })
            .exec())
            .pipe(
                map((radar) => {                    
                    return radar
                })
            )
    }

}