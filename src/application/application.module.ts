import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infrastructure";
import { CreateTrainingLeagueUseCase, LoginUseCase, RegisterUseCase } from "./use-cases";
import { AddStudentUseCase } from "./use-cases/add-student.use-case";
import { AddRadarUseCase } from "./use-cases/add-radar.use-case";
import { CreateStudentEvaluationUseCase } from "./use-cases/create-student-evaluation.use.case";
import { GetAllTrainingsUseCase } from "./use-cases/get-all-trainings.use-case";
import { GetAllUserUseCase } from './use-cases/get-all-user.use-case';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { GetStudentEvaluationUseCase } from "./use-cases/get-student-evaluation.use.case";


@Module({
    imports: [DatabaseModule],
    providers: [LoginUseCase, RegisterUseCase, CreateTrainingLeagueUseCase, AddStudentUseCase, AddRadarUseCase, CreateStudentEvaluationUseCase,
    GetAllTrainingsUseCase, GetStudentEvaluationUseCase, GetAllUserUseCase, GetUserByEmailUseCase,UpdateUserUseCase,],
    exports: [LoginUseCase, RegisterUseCase, CreateTrainingLeagueUseCase, AddStudentUseCase, AddRadarUseCase, CreateStudentEvaluationUseCase,
    GetAllTrainingsUseCase, GetStudentEvaluationUseCase, GetAllUserUseCase, GetUserByEmailUseCase,UpdateUserUseCase,]
  })
export class ApplicationModule {}
