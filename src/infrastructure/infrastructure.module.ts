import { Module } from "@nestjs/common";
import { ApplicationModule } from "../application/application.module";
import { RadarController } from "./controllers/radar.controller";
import { MessagingModule } from "./messaging/messaging.module";
import { LoginController, TrainingLeagueController } from "./controllers";
import { StudentEvaluationController } from "./controllers/student-evaluation.controller";


@Module({
    imports: [
        ApplicationModule,
        MessagingModule,
    ],
    controllers: [
        LoginController,
        TrainingLeagueController,
        StudentEvaluationController,
        RadarController,
    ],
    providers: [],
  })
export class InfrastructureModule {}