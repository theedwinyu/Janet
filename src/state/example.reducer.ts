import { ExampleState, CourseDetails } from './example.model';

export const initialState = new ExampleState({
    0: { id: 0, title: 'What\'s in a Credit Score?', description: 'Find out what affects your score' },
    1: { id: 1, title: 'Financial Planning', description: 'Staying on track' },
    2: { id: 2, title: 'Financial Goals', description: 'Planning for your next big purchase!' },
    3: { id: 3, title: 'Creating and Implementing a Budget', description: 'Budgeting 101' },
}, [
    0, 1, 2, 3
]);

export const example = (state = initialState, action: any): ExampleState => {
    switch (action.type) {
        default:
            return state
    }
};

