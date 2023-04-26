import { ObjectId } from 'mongoose';
import { RadarDTO } from '../../../domain';
import { ApiProperty } from '@nestjs/swagger';

export class DCreateRadarDto implements RadarDTO {
  @ApiProperty()
  _id?: ObjectId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  trainingId: string;
  @ApiProperty()
  criteria: string[];
}
