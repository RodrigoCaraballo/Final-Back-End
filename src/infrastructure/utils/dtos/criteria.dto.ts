import { Schema } from 'mongoose';
import { CriteriaDTO } from '../../../domain';
import { ApiProperty } from '@nestjs/swagger';

export class DCriteriaDtio implements CriteriaDTO {
  @ApiProperty()
  _id?: Schema.Types.ObjectId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  descriptor: string;
  @ApiProperty()
  area: string;
  @ApiProperty()
  minQualiRequired: number;
}
