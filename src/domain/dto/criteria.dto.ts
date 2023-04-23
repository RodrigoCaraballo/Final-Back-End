import { ObjectId } from "mongoose";

export interface CriteriaDTO {
    readonly _id?: ObjectId;
    descriptor: string;
    area: string;
}