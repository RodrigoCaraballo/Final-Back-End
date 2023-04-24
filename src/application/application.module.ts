import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infrastructure";
import {
  AddCriteriaUseCase,
  CreateCriteriaUseCase,
  CreateRadarUseCase,
  GetCriteriasUseCase,
  LoginUseCase,
  RegisterUseCase } from "./use-cases";

@Module({
    imports: [DatabaseModule],
    providers: [
      LoginUseCase,
      RegisterUseCase,
      CreateRadarUseCase,
      CreateCriteriaUseCase,
      GetCriteriasUseCase,
      AddCriteriaUseCase],
    exports: [
      LoginUseCase,
      RegisterUseCase,
      CreateRadarUseCase,
      CreateCriteriaUseCase,
      GetCriteriasUseCase,
      AddCriteriaUseCase,
    ]
  })
export class ApplicationModule {}