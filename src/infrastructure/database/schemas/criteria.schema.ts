import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CriteriaDocument = HydratedDocument<Criteria>;
@Schema({ versionKey: false, timestamps: true, collection: 'Criteria' })
export class Criteria {
  @Prop({type: String, required: true })
  area: string;

  @Prop({type: String, required: true })
  name: string;

  @Prop({type: String, required: true })
  descriptor: string;

  @Prop({type: Number, required: true})
  minQualiRequired: number;

}

export const CriteriaSchema = SchemaFactory.createForClass(Criteria);