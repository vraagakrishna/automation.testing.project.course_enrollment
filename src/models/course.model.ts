export class Course {
    title: string;
    description: string;
    duration?: string;
    level: string = 'Beginner';
    price?: number;
    thumbnailUrl?: string;
    meetingUrl?: string;
    published: boolean = false;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}
