import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { AddRadarDTO } from "../../../domain";


@Injectable()
export class RadarCreatedPublisher {

    constructor(
        @Inject('USER_SERVICE') private readonly cliente: ClientProxy
    ) {}

    publish(data: AddRadarDTO): void {
        this.cliente.emit('radar_created', data);
    }

}