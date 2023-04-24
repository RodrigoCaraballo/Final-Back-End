import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../../../domain';
import { UpdateUserDto } from '../../../domain/dto/update-use.dto';

export class DUpdateUserDto implements UpdateUserDto {
  @ApiProperty()
  uid?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  activate?: boolean;
  @ApiProperty()
  role?: RolesEnum;
}
