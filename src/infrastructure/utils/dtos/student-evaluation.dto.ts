import { ApiProperty } from '@nestjs/swagger';
import { StudentEvaluationDTO } from '../../../domain';

export class DStudentEvaluationDto implements StudentEvaluationDTO {
  @ApiProperty()
  trainingLeague: string;
  @ApiProperty()
  student: string;
  @ApiProperty()
  evaluations: { 
    criteria: string; 
    qualification: number }[];
}
