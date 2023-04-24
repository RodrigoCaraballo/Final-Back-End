import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infrastructure";
import { AddStudentUseCase } from "./use-cases/add-student.use-case";
import { AddRadarUseCase } from "./use-cases/add-radar.use-case";
import { CreateStudentEvaluationUseCase } from "./use-cases/create-student-evaluation.use.case";
import { GetAllTrainingsUseCase } from "./use-cases/get-all-trainings.use-case";
import { GetAllUserUseCase } from './use-cases/get-all-user.use-case';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { GetStudentEvaluationUseCase } from "./use-cases/get-student-evaluation.use.case";
<<<<<<< HEAD
import { GetTrainingLeagueUseCase } from "./use-cases/get-training-league.use-case";
=======
import {
  CreateTrainingLeagueUseCase,
  AddCriteriaUseCase,
  CreateCriteriaUseCase,
  CreateRadarUseCase,
  GetCriteriasUseCase,
  LoginUseCase,
  RegisterUseCase } from "./use-cases";
>>>>>>> fb202a92e5ddfcdfc7aedcd1db26b4dbf3071cf1


@Module({
    imports: [DatabaseModule],
<<<<<<< HEAD
    providers: [LoginUseCase, RegisterUseCase, CreateTrainingLeagueUseCase, AddStudentUseCase, AddRadarUseCase, CreateStudentEvaluationUseCase,
    GetAllTrainingsUseCase, GetStudentEvaluationUseCase, GetAllUserUseCase, GetUserByEmailUseCase,UpdateUserUseCase, GetTrainingLeagueUseCase],
    exports: [LoginUseCase, RegisterUseCase, CreateTrainingLeagueUseCase, AddStudentUseCase, AddRadarUseCase, CreateStudentEvaluationUseCase,
    GetAllTrainingsUseCase, GetStudentEvaluationUseCase, GetAllUserUseCase, GetUserByEmailUseCase,UpdateUserUseCase, GetTrainingLeagueUseCase]
=======
    providers: [
      LoginUseCase,
      RegisterUseCase,
      CreateRadarUseCase,
      CreateCriteriaUseCase,
      GetCriteriasUseCase,
      AddCriteriaUseCase,
      LoginUseCase,
      RegisterUseCase,
      CreateTrainingLeagueUseCase,
      AddStudentUseCase,
      AddRadarUseCase,
      CreateStudentEvaluationUseCase,
      GetAllTrainingsUseCase,
      GetStudentEvaluationUseCase,
      GetAllUserUseCase,
      GetUserByEmailUseCase,
      UpdateUserUseCase,
    ],
    exports: [
      LoginUseCase,
      RegisterUseCase,
      CreateRadarUseCase,
      CreateCriteriaUseCase,
      GetCriteriasUseCase,
      AddCriteriaUseCase,
      LoginUseCase,
      RegisterUseCase,
      CreateTrainingLeagueUseCase,
      AddStudentUseCase,
      AddRadarUseCase,
      CreateStudentEvaluationUseCase,
      GetAllTrainingsUseCase,
      GetStudentEvaluationUseCase,
      GetAllUserUseCase,
      GetUserByEmailUseCase,
      UpdateUserUseCase,
    ]
>>>>>>> fb202a92e5ddfcdfc7aedcd1db26b4dbf3071cf1
  })
export class ApplicationModule {}
