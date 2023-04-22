import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Observable, catchError, from, map } from "rxjs";
import { Model } from "mongoose";

import { UserDTO, IUserModel, IUserRepository } from "../../../domain";
import { User, UserDocument } from "../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @InjectModel(User.name)
        private readonly repository: Model<UserDocument>
    ) { }

    createUser(command: UserDTO): Observable<IUserModel> {
        return from(this.repository.create(command))
            .pipe(
                map((user: IUserModel) => {
                    return user
                }),
                catchError(error => {
                    if (error.code === 11000) throw new ConflictException('User already exists')
                    else throw new Error(`Generic error: ${error.message}`)
                })
            )
    }
    getUser(uid: string): Observable<IUserModel> {
        return from(this.repository.findOne({ uid }))
            .pipe(
                map((user: IUserModel) => {
                    return user
                }),
                catchError(error => {
                    if (error.code === 404) throw new NotFoundException('User not found')
                    else throw new Error(`Generic error: ${error.message}`)
                })
            )
    }
    updateUser(id: string, user: UserDTO): Observable<IUserModel> {
        return from(this.repository.findByIdAndUpdate(id, user))
            .pipe(
                map((user: IUserModel) => {
                    return user
                }),
                catchError(error => {
                    if (error.code === 404) throw new NotFoundException('User not found');
                    if (error.code === 11000) throw new ConflictException('Cannot update user, user property already exists')
                    else throw new Error(`Generic error: ${error.message}`)
                })
            )
    }

}