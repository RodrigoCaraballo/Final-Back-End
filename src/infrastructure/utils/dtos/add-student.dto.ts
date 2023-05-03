import { ApiProperty } from "@nestjs/swagger";
import { AddStudentDTO } from "../../../domain/dto/add-student.dto";

export class DAddStudentDto implements AddStudentDTO{
    @ApiProperty()
    trainingId: string;
    @ApiProperty()
    studentId: string;
}