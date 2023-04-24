import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema, Radar, RadarSchema, CriteriaSchema, Criteria } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { RadarRepository, CriteriaRepository } from './repositories';
import { UserRepository } from './repositories';
import { TrainingLeagueRepository } from './repositories/training-league.repository';
import { TrainingLeague, TrainingLeagueSchema } from './schemas/training-league.schema';
import { StudentEvaluationRepository } from './repositories/student-evaluation.repository';
import { StudentEvalaution, StudentEvalautionSchema } from './schemas/student-evaluation.schema';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://rodrigocaraballo:rodri007@cluster0.fzcprav.mongodb.net/final-back-develop?retryWrites=true&w=majority'),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: TrainingLeague.name, schema: TrainingLeagueSchema },
          { name: StudentEvalaution.name, schema: StudentEvalautionSchema },
          { name: Radar.name, schema: RadarSchema },
          { name: Criteria.name, schema: CriteriaSchema },
        ])],
    providers: [
      { provide: 'IUserRepository', useClass: UserRepository },
      { provide: 'ITrainingLeagueRepository', useClass: TrainingLeagueRepository },
      { provide: 'IStudentEvaluationRepository', useClass: StudentEvaluationRepository },
      { provide: 'IUserRepository', useClass: UserRepository },
      { provide: 'IRadarRepository', useClass: RadarRepository },
      { provide: 'ICriteriaRepository', useClass: CriteriaRepository },
    ],
    exports: [
      MongooseModule,
      'IUserRepository',
      'ITrainingLeagueRepository',
      'IStudentEvaluationRepository',
      'IRadarRepository',
      'ICriteriaRepository',
    ]
})
export class DatabaseModule { }