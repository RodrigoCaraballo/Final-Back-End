import { Observable } from "rxjs";
import { UserDTO } from "../dto/user.dto";
import { IUserModel } from "../model/user.model";

export interface IUserRepository {

    createUser(command: UserDTO): Observable<IUserModel>;
    getUser(uid: string): Observable<IUserModel>;
    updateUser(id: string, user: UserDTO): Observable<IUserModel>;
}