import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { AddRadarDTO, RadarDTO } from "../../../domain";


@Injectable()
export class RadarCreatedPublisher {

    constructor(
        @Inject('USER_SERVICE') private readonly cliente: ClientProxy
    ) {}

    publish(radar: RadarDTO): void {

        const data: AddRadarDTO = {
            trainingId: radar.trainingId,
            radarId: radar._id.toString()
        }

        this.cliente.emit('radar_created', data);
    }

}