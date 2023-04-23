import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infrastructure";
import { AddCriteriaUseCase, CreateCriteriaUseCase, CreateRadarUseCase, LoginUseCase, RegisterUseCase } from "./use-cases";

@Module({
    imports: [DatabaseModule],
    providers: [LoginUseCase, RegisterUseCase, CreateRadarUseCase, CreateCriteriaUseCase, AddCriteriaUseCase],
    exports: [LoginUseCase, RegisterUseCase, CreateRadarUseCase, CreateCriteriaUseCase, AddCriteriaUseCase]
  })
export class ApplicationModule {}