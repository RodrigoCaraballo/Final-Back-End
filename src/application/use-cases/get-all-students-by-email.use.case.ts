import { Inject, Injectable } from "@nestjs/common";
import { IUserModel, IUserRepository } from "../../domain";
import { Observable, catchError, map } from "rxjs";

@Injectable()
export class GetAllStudentByEmailUseCase {
    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository
    ) {}

    execute(email: string): Observable<IUserModel[]> {
        if(!email) email = '';
        return this.userRepository.getAllStudentsByEmail()
        .pipe(
            map(
                (students: IUserModel[]) => students.filter(user => user.email.toLowerCase().includes(email.toLowerCase()))),
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }
}