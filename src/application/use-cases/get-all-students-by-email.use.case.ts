import { Inject, Injectable } from "@nestjs/common";
import { IUserModel, IUserRepository } from "../../domain";
import { Observable, catchError, map } from "rxjs";

@Injectable()
export class GetAllStudentByEmailUseCase {
    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository
    ) {}

    execute(email: string): Observable<IUserModel[]> {
        return this.userRepository.getAllStudentsByEmail(email)
        .pipe(
            map(
                (students: IUserModel[]) => students
            ),
            catchError((error: Error) => {
                throw new Error(error.message);
            })
        )
    }
}