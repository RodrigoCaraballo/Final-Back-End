import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Observable } from 'rxjs';
import { IRadarRepository } from '../../domain/repositories';
import { RadarModel } from '../../domain';

@Injectable()
export class GetAllRadarsUseCase {
  constructor(
    @Inject('IRadarRepository') private readonly radarRepository: IRadarRepository,
  ) {}
  execute(): Observable<RadarModel[]> {
    return this.radarRepository.getAllRadars();
  }
}
