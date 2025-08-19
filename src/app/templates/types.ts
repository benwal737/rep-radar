export interface Session {
  id: string;
  user: string;
  template: string;
  templateId: string;
  startedAt: string;
  endedAt: string;
  completed: boolean;
  duration: string;
}

export interface Template {
  id: string;
  user: string;
  name: string;
  categories: string[];
  exerciseBlocks: ExerciseBlock[];
  sessions: Session[];
}

export interface ExerciseBlock {
  id: string;
  template: string;
  templateId: string;
  sets: Set[];
}

export interface Exercise {
  id: string;
  name: string;
  categories: string[];
  sets: Set[];
}

export interface Set {
  id: string;
  exercise: string;
  exerciseId: string;
  exerciseBlock: string;
  exerciseBlockId: string;
  reps: number;
  weight: number;
  completed: boolean;
}
