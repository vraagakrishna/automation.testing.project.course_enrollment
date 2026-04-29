export const COURSE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export type CourseLevel = (typeof COURSE_LEVELS)[number];
