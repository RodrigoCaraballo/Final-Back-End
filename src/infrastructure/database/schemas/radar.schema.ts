import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type RadarDocument = HydratedDocument<Radar>;
@Schema({ versionKey: false, timestamps: true, collection: 'Radars' })
export class Radar {
  @Prop({ required: true })
  name: string;

  @Prop({type: String, required: true })
  trainingId: string;

  @Prop({type: [Types.ObjectId], required: true, ref: 'Criteria'})
  criteria: string[];

}

export const RadarSchema = SchemaFactory.createForClass(Radar);