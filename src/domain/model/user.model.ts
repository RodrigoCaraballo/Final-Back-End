import { RolesEnum } from "./enum";

export interface IUserModel {
    readonly id?: string,
    uid: string;
    email: string;
    name: string;
    activate: boolean; 
    role?: RolesEnum
}