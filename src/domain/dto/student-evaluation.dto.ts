export interface StudentEvaluationDTO {
    trainingLeague: string;
    student: string;
    evaluations: {
        criteria: string;
        qualification: number;
    }[];
}