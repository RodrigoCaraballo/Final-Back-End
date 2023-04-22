import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infrastructure";
import { LoginUseCase, RegisterUseCase } from "./use-cases";

@Module({
    imports: [DatabaseModule],
    providers: [LoginUseCase, RegisterUseCase],
    exports: [LoginUseCase, RegisterUseCase]
  })
export class ApplicationModule {}