import { ApiProperty } from '@nestjs/swagger';
import { CreateTrainingLeagueDTO } from '../../../domain/dto/training-league.dto';
export class DCreateTrainingLeagueDTO implements CreateTrainingLeagueDTO{
    @ApiProperty()
    title: string;
    @ApiProperty()
    cicle: string;
    @ApiProperty()
    coach: string;
}