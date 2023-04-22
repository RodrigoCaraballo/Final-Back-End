import { Module } from "@nestjs/common";
import { ApplicationModule } from "../application/application.module";
import { LoginController } from "./controllers";
import { RadarController } from "./controllers/radar.controller";

@Module({
    imports: [ApplicationModule],
    controllers: [LoginController, RadarController],
    providers: [],
  })
export class InfrastructureModule {}