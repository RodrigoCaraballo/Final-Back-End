import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CriteriaDocument = HydratedDocument<Criteria>;
@Schema({ versionKey: false, timestamps: true, collection: 'Criteral' })
export class Criteria {
  @Prop({ required: true })
  area: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  descriptor: string;

  @Prop({type: Number, required: true})
  minQualiRequired: number;

}

export const CriteriaSchema = SchemaFactory.createForClass(Criteria);