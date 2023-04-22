import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CriteriaDocument = HydratedDocument<Criteria>;
@Schema({ versionKey: false, timestamps: true, collection: 'Criteral' })
export class Criteria {
  @Prop()
  area: string;

  @Prop({ required: true })
  descriptor: string;

}

export const CriteriaSchema = SchemaFactory.createForClass(Criteria);