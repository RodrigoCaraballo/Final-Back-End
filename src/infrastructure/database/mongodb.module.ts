import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://rodrigocaraballo:rodri007@cluster0.fzcprav.mongodb.net/final-back-jerson?retryWrites=true&w=majority'),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema }
        ])],
    providers: [{ provide: 'IUserRepository', useClass: UserRepository }],
    exports: [MongooseModule , 'IUserRepository']
})
export class DatabaseModule { }