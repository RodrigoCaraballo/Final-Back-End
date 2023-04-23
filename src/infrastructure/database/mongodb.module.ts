import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema, Radar, RadarSchema, CriteriaSchema, Criteria } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository, RadarRepository, CriteriaRepository } from './repositories';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://rodrigocaraballo:rodri007@cluster0.fzcprav.mongodb.net/final-back-christian?retryWrites=true&w=majority'),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Radar.name, schema: RadarSchema },
          { name: Criteria.name, schema: CriteriaSchema },
        ])],
    providers: [
      { provide: 'IUserRepository', useClass: UserRepository },
      { provide: 'IRadarRepository', useClass: RadarRepository },
      { provide: 'ICriteriaRepository', useClass: CriteriaRepository },
    ],
    exports: [MongooseModule , 'IUserRepository', 'IRadarRepository', 'ICriteriaRepository']
})
export class DatabaseModule { }