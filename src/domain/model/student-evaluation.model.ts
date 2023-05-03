export interface StudentEvaluationModel {
  readonly id?: string;
  trainingLeague: string;
  student: string;
  evaluations: {
    criteria: string;
    qualification: number;
  }[];
}
