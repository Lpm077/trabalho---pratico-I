export type MuscleGroup =
  | 'Peito'
  | 'Costas'
  | 'Pernas'
  | 'Ombros'
  | 'Bíceps'
  | 'Tríceps'
  | 'Abdômen'
  | 'Outro';

export interface Workout {
  id: string;
  name: string;
  sets: number;
  reps: number;
  muscleGroup: MuscleGroup;
  completed: boolean;
}
