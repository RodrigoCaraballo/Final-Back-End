import { Module } from "@nestjs/common";
import { ApplicationModule } from "../application/application.module";
import { LoginController } from "./controllers";

@Module({
    imports: [ApplicationModule],
    controllers: [LoginController],
    providers: [],
  })
export class InfrastructureModule {}