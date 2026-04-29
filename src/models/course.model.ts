export class Course {
    title: string;
    description: string;
    duration?: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' = 'Beginner';
    price?: number;
    thumbnailUrl?: string;
    meetingUrl?: string;
    published: boolean = false;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }
}
