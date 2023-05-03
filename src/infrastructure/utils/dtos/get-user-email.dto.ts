import { ApiProperty } from '@nestjs/swagger';

export class GetUserEmailDto {
  @ApiProperty()
  email: string;
}
