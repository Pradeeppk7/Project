export interface Course {
  id: string;
  learningObjective: string;
  learnerPersona: string;
  prerequisites: string;
  description?: string;
  pdf?: {
    name: string;
    dataUrl: string;
  } | null;
  createdAt: string;
}

export type NewCourse = Omit<Course, 'id' | 'createdAt'>;
