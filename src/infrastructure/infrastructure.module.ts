import { Module } from "@nestjs/common";
import { ApplicationModule } from "../application/application.module";
import { LoginController } from "./controllers";
import { RadarController } from "./controllers/radar.controller";
import { MessagingModule } from "./messaging/messaging.module";

@Module({
    imports: [ApplicationModule, MessagingModule],
    controllers: [LoginController, RadarController],
    providers: [],
  })
export class InfrastructureModule {}