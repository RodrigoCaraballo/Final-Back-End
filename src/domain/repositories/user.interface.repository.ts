import { Observable } from "rxjs";
import { UserDTO } from "../dto/user.dto";
import { IUserModel } from "../model/user.model";

export interface IUserRepository {

    createUser(command: UserDTO): Observable<IUserModel>;
    getUser(uid: string): Observable<IUserModel>;
    updateUser(id: string, user: UserDTO): Observable<IUserModel>;
    getUserByEmail(email:string): Observable<IUserModel>;
    getAllUser(): Observable<IUserModel[]>
}