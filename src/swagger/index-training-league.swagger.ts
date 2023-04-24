import { ApiProperty } from '@nestjs/swagger';

export class IndexTrainingLeagueSwagger {
  @ApiProperty()
  title: string;
  @ApiProperty()
  cicle: string;
  @ApiProperty()
  radar: string;
  @ApiProperty()
  students?: string[];
  @ApiProperty()
  coach: string;
}
