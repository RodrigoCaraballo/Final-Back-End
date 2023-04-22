import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infrastructure";
import { AddCriteriaUseCase, CreateRadarUseCase, LoginUseCase, RegisterUseCase } from "./use-cases";

@Module({
    imports: [DatabaseModule],
    providers: [LoginUseCase, RegisterUseCase, CreateRadarUseCase, AddCriteriaUseCase],
    exports: [LoginUseCase, RegisterUseCase, CreateRadarUseCase, AddCriteriaUseCase]
  })
export class ApplicationModule {}