import { Course } from '../../models/course.model';
import { CourseTestData } from './course-test-data';

export class CourseFactory {
    static create(published: boolean): Course {
        const data = new CourseTestData();

        const course = new Course(data.randomCourseName(), data.randomDescription());

        course.level = data.randomCourseLevel();
        course.duration = data.validDuration();
        course.price = data.validPrice();
        course.thumbnailUrl = data.validThumbnailUrl();
        course.meetingUrl = data.validTeamsLink();
        course.published = published;

        return course;
    }
}
