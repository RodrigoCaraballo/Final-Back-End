import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TrainingLeagueDocument = HydratedDocument<TrainingLeague>;

@Schema({ versionKey: false, timestamps: true, collection: 'Training Leagues' })
export class TrainingLeague {
  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String, required: true })
  cicle: string;

  @Prop({ type: Types.ObjectId, ref: 'Radar' })
  radar: string;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  students: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  coach: string;
}

export const TrainingLeagueSchema =
  SchemaFactory.createForClass(TrainingLeague);
