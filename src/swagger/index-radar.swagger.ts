import { ApiProperty } from '@nestjs/swagger';

export class IndexRadarSwagger {
  @ApiProperty()
  name: string;
  @ApiProperty()
  trainingId: string;
  @ApiProperty()
  criteria: string[];
}
