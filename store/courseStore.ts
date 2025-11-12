import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course, NewCourse } from '@/types/course';

interface CourseStore {
  courses: Course[];
  addCourse: (course: NewCourse) => void;
  removeCourse: (id: string) => void;
  clearCourses: () => void;
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      courses: [],

      addCourse: (course) => {
        const newCourse: Course = {
          id: Date.now().toString(),
          learningObjective: course.learningObjective,
          learnerPersona: course.learnerPersona,
          prerequisites: course.prerequisites,
          description: (course as any).description ?? '',
          pdf: (course as any).pdf ?? null,
          createdAt: new Date().toISOString(),
        };
        set({ courses: [...get().courses, newCourse] });
      },

      removeCourse: (id) => {
        set({ courses: get().courses.filter((c) => c.id !== id) });
      },

      clearCourses: () => set({ courses: [] }),
    }),
    {
      name: 'course-storage',
      partialize: (state) => ({ courses: state.courses }),
    }
  )
);

export default useCourseStore;
