import { ApiProperty } from '@nestjs/swagger';
export class IndexStudentEvaluationSwagger {
  @ApiProperty()
  trainingLeague: string;
  @ApiProperty()
  student: string;
  @ApiProperty()
  evaluations: { criteria: string; qualification: number }[];
}
