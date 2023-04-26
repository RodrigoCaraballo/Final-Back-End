import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure';
import { AddStudentUseCase } from './use-cases/add-student.use-case';
import { AddRadarUseCase } from './use-cases/add-radar.use-case';
import { CreateStudentEvaluationUseCase } from './use-cases/create-student-evaluation.use.case';
import { GetAllTrainingsUseCase } from './use-cases/get-all-trainings.use-case';
import { GetAllUserUseCase } from './use-cases/get-all-user.use-case';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { GetStudentEvaluationUseCase } from "./use-cases/get-student-evaluation.use.case"

import {
  CreateTrainingLeagueUseCase,
  AddCriteriaUseCase,
  CreateCriteriaUseCase,
  CreateRadarUseCase,
  GetCriteriasUseCase,
  LoginUseCase,
  RegisterUseCase,
  GetTrainingLeagueUseCase
} from "./use-cases";
import { GetTrainingEvaluationsUseCase } from './use-cases/get-all-student-evaluations.use-case';
import { GetAllStudentByEmailUseCase } from './use-cases/get-all-students-by-email.use.case';
import { UpdateCriteriaUseCase } from './use-cases/update-criteria.use-case';
import { GetRadarCriteriaUseCase } from './use-cases/get-radar-criteria-use.case';
import { GetAllRadarsUseCase } from './use-cases/get-all-radars.use-case';


@Module({
  imports: [DatabaseModule],
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
    GetTrainingLeagueUseCase,
    GetTrainingEvaluationsUseCase,
    GetAllStudentByEmailUseCase,
    UpdateCriteriaUseCase,
    GetRadarCriteriaUseCase,
    GetAllRadarsUseCase,
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
    GetTrainingLeagueUseCase,
    GetTrainingEvaluationsUseCase,
    GetAllStudentByEmailUseCase,
    UpdateCriteriaUseCase,
    GetRadarCriteriaUseCase,
    GetAllRadarsUseCase,
  ]
})
export class ApplicationModule { }
