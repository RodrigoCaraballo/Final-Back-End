import { RolesEnum } from "../../../domain";
import { UserDTO } from "../../../domain/dto";
import { ApiProperty } from "@nestjs/swagger";

export class DUserDto implements UserDTO{
    @ApiProperty()
    uid: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    activate?: boolean;
    @ApiProperty()
    role?: RolesEnum;
}