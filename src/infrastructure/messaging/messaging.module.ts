import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { Transport } from "@nestjs/microservices/enums";

import { RadarCreatedPublisher } from './publisher/radar-created.publisher';

// require('dotenv').config({ path: './environments/.env' });

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqps://krhipita:qhSzLh65EFm3WRxUf_1PO2FrAoDR1YcL@toad.rmq.cloudamqp.com/krhipita'],
                    queue: 'main_queue',
                    queueOptions: {
                      durable: false
                    },
                },
            },
        ])
    ],
    controllers: [],
    providers: [
        RadarCreatedPublisher,
    ],
    exports: [
        RadarCreatedPublisher,
    ]
})

export class MessagingModule {}