export interface TrainingLeagueModel {
    name: string;
    description: string;
    radar?: string;
    students: {
        student: string;
        evaluation: {
            criteria: string;
            factual: number;
            conceptual: number;
            procedural: number;
            metacognitive: number;
        }[];
    }[];
}