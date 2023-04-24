import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../domain/model/enum/role.enum';
export class IndexUserSwagger {
  @ApiProperty()
  uid: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  activate: boolean;
  @ApiProperty()
  role: RolesEnum;
}
