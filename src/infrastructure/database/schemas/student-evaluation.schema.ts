import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type StudentEvalautionDocument = HydratedDocument<StudentEvalaution>;
@Schema({ versionKey: false, timestamps: true, collection: 'Student Evalautions' })
export class StudentEvalaution {

    @Prop({ type: Types.ObjectId, required: true, ref: 'TrainingLeague' })
    trainingLeague: string;

    @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
    student: string;

    @Prop({
        evaluations: [
            {
                criteria: { type: Types.ObjectId, ref: 'Criteria' },
                qualification: { type: Number }
            },
        ]
    })
    evaluations: {
        criteria: string;
        qualification: number;
    }[];

}

export const StudentEvalautionSchema = SchemaFactory.createForClass(StudentEvalaution);