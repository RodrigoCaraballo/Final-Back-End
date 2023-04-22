import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TrainingLeagueDocument = HydratedDocument<TrainingLeague>;

@Schema({ versionKey: false, timestamps: true, collection: 'Training Leagues' })
export class TrainingLeague {

    @Prop({ type: String, required: true, unique: true })
    title: string;

    @Prop({ type: String, required: true, unique: true })
    cicle: string;

    @Prop([{ type: Types.ObjectId, ref: 'Radar' }])
    radar?: string;

    @Prop([
        {
            student: { type: Types.ObjectId, ref: 'User' },
            evaluation: [
                {
                    criteria: { type: Types.ObjectId, ref: 'Criteria' },
                    factual: { type: Number },
                    conceptual: { type: Number },
                    procedural: { type: Number },
                    metacognitive: { type: Number }
                },
            ],
        },
    ])

    students: {
        student: string;
        evaluation: {
            criteria: string;
            factual: number,
            conceptual: number,
            procedural: number,
            metacognitive: number
        }[];
    }[];

}

export const TrainingLeagueSchema = SchemaFactory.createForClass(TrainingLeague);