import { Course } from '../models/course.model';

export class ConfigManager {
    static courses: Course[] = [];

    static addCourse(course: Course) {
        this.courses.push(course);
    }

    static clearCourses() {
        this.courses = [];
    }

    static getCourses(): Course[] {
        return this.courses;
    }
}
