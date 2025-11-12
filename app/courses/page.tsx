"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useCourseStore } from '@/store/courseStore';

const CoursesPage: React.FC = () => {
  const router = useRouter();
  const [learningObjective, setLearningObjective] = useState('');
  const [learnerPersona, setLearnerPersona] = useState('');
  const [prerequisites, setPrerequisites] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState<{ name: string; dataUrl: string } | null>(null);

  const courses = useCourseStore((s) => s.courses);
  const addCourse = useCourseStore((s) => s.addCourse);
  const removeCourse = useCourseStore((s) => s.removeCourse);
  const clearCourses = useCourseStore((s) => s.clearCourses);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!learningObjective.trim() || !learnerPersona.trim()) {
      // minimal validation: required fields
      return;
    }

    addCourse({
      learningObjective,
      learnerPersona,
      prerequisites,
      description,
      pdf: pdfFile,
    } as any);

    setLearningObjective('');
    setLearnerPersona('');
    setPrerequisites('');
    setDescription('');
    setPdfFile(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Create Course</h1>
        <Button variant="outline" onClick={() => router.back()}>
          ← Back
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Learning Objective</label>
          <Input
            value={learningObjective}
            onChange={(e) => setLearningObjective(e.target.value)}
            placeholder="What should learners achieve by the end?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Learner Persona</label>
          <Input
            value={learnerPersona}
            onChange={(e) => setLearnerPersona(e.target.value)}
            placeholder="Who is the target learner?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Prerequisites</label>
          <textarea
            value={prerequisites}
            onChange={(e) => setPrerequisites(e.target.value)}
            placeholder="Any prerequisites (optional)"
            className="w-full rounded-md border border-secondary-300 px-3 py-2 text-sm"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Course Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief course description"
            className="w-full rounded-md border border-secondary-300 px-3 py-2 text-sm"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload PDF (optional)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > 5 * 1024 * 1024) {
                // limit 5MB
                alert('File too large (max 5MB)');
                e.currentTarget.value = '';
                return;
              }

              const reader = new FileReader();
              reader.onload = () => {
                const dataUrl = reader.result as string;
                setPdfFile({ name: file.name, dataUrl });
              };
              reader.readAsDataURL(file);
            }}
            className="w-full"
          />
          {pdfFile ? <p className="text-sm mt-1">Selected: {pdfFile.name}</p> : null}
        </div>

        <div className="flex gap-2">
          <Button type="submit">Create Course</Button>
          <Button variant="outline" type="button" onClick={() => clearCourses()}>
            Clear All
          </Button>
        </div>
      </form>

      <section>
        <h2 className="text-xl font-semibold mb-3">Created Courses</h2>

        {courses.length === 0 ? (
          <p className="text-sm text-secondary-600">No courses created yet.</p>
        ) : (
          <ul className="space-y-4">
            {courses
              .slice()
              .reverse()
              .map((course) => (
                <li key={course.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-secondary-500">Created: {new Date(course.createdAt).toLocaleString()}</p>
                      <h3 className="text-lg font-medium mt-1">{course.learningObjective}</h3>
                      <p className="text-sm mt-1"><strong>Learner Persona:</strong> {course.learnerPersona}</p>
                      {course.prerequisites ? (
                        <p className="text-sm mt-1"><strong>Prerequisites:</strong> {course.prerequisites}</p>
                      ) : null}
                    </div>
                    <div className="ml-4">
                      <Button variant="ghost" size="sm" onClick={() => removeCourse(course.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default CoursesPage;
