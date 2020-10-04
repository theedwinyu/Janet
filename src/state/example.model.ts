export class ExampleState {
    constructor(
        public items: { [id: number]: Item },
        public ids: number[] = []
    ) { }
}

export class Items {
    public items: Item[] = [];
}

export interface Item {
    id: number;
    title: string;
    description: string;
}

export interface CourseDetail {
    id: number;
    title: string;
    content: string;
}

export class CourseDetails {
    constructor(
        public courseContent: { [id: number]: CourseDetail },
        public ids: number[] = []
    ) { }
}