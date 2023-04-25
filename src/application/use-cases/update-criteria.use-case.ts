import { Inject } from '@nestjs/common';
import { CriteriaDTO } from '../../domain/dto/criteria.dto';
import { ICriteriaRepository } from '../../domain/repositories/criteria.repository.interface';
export class UpdateCriteriaUseCase {
  constructor(
    @Inject('ICriteriaRepository')
    private readonly criteriaRepository: ICriteriaRepository,
  ) {}
  execute(id: string, command: CriteriaDTO) {
    return this.criteriaRepository.updateCriteria(id, command);
  }
}
