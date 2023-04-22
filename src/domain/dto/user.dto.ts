import { RolesEnum } from "../model";

export interface UserDTO {
    uid: string;
    email: string;
    name: string;
    activate?: boolean; 
    role?: RolesEnum
}