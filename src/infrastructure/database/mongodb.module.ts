import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema, Radar, RadarSchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository, RadarRepository } from './repositories';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://rodrigocaraballo:rodri007@cluster0.fzcprav.mongodb.net/final-back?retryWrites=true&w=majority'),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Radar.name, schema: RadarSchema },
        ])],
    providers: [
      { provide: 'IUserRepository', useClass: UserRepository },
      { provide: 'IRadarRepository', useClass: RadarRepository },
    ],
    exports: [MongooseModule , 'IUserRepository', 'IRadarRepository']
})
export class DatabaseModule { }