import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories';
import { TrainingLeagueRepository } from './repositories/training-league.repository';
import { TrainingLeague, TrainingLeagueSchema } from './schemas/training-league.schema';
import { StudentEvaluationRepository } from './repositories/student-evaluation.repository';
import { StudentEvalaution, StudentEvalautionSchema } from './schemas/student-evaluation.schema';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://rodrigocaraballo:rodri007@cluster0.fzcprav.mongodb.net/final-back-rodrigo?retryWrites=true&w=majority'),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: TrainingLeague.name, schema: TrainingLeagueSchema },
          { name: StudentEvalaution.name, schema: StudentEvalautionSchema }
        ])],
    providers: [{ provide: 'IUserRepository', useClass: UserRepository }, {provide: 'ITrainingLeagueRepository', useClass: TrainingLeagueRepository},
    {provide: 'IStudentEvaluationRepository', useClass: StudentEvaluationRepository}],
    exports: [MongooseModule , 'IUserRepository', 'ITrainingLeagueRepository', 'IStudentEvaluationRepository']
})
export class DatabaseModule { }