import { ObjectId } from "mongoose";

export interface RadarDTO {
    _id?: ObjectId;
    name: string;
    trainingId: string;
    criteria: string[];
}