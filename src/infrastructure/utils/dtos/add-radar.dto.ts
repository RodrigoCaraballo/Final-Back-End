import { ApiProperty } from '@nestjs/swagger';
import { AddRadarDTO } from '../../../domain';

export class DAddRadarDto implements AddRadarDTO {
  @ApiProperty()
  trainingId: string;
  @ApiProperty()
  radarId: string;
}
