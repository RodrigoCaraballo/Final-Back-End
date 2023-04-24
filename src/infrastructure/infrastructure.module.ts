import { Module } from "@nestjs/common";
import { ApplicationModule } from "../application/application.module";
import { LoginController, TrainingLeagueController } from "./controllers";
import { StudentEvaluationController } from "./controllers/student-evaluation.controller";

@Module({
    imports: [ApplicationModule],
    controllers: [LoginController, TrainingLeagueController, StudentEvaluationController],
    providers: [],
  })
export class InfrastructureModule {}