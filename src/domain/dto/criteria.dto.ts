import { ObjectId } from "mongoose";

export interface CriteriaDTO {
    readonly _id?: ObjectId;
    name: string;
    descriptor: string;
    area: string;
    minQualiRequired: number;
}