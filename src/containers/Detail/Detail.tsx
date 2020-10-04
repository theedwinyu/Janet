import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.scss';
import { Item } from '../../state';
import { CourseContent } from '../../components';

import DragDropQuiz from '../../components/Quiz/DragDropQuiz'
import MCQuiz from '../../components/Quiz/MCQuiz';
import CheckboxQuiz from '../../components/Quiz/CheckboxQuiz';
import TextBoxQuiz from '../../components/Quiz/TextBoxQuiz';

export interface DetailProps {
    item: Item | null,
    setState: any,
    state: any
}

interface ParamTypes {
    id: any;
}
  
export const DetailContainer: React.FC<DetailProps> = (props) => {
    let id = useParams<ParamTypes>();
    if (Object.keys(id).length === 0) {
        id = { id: 0 };
    } 

    let quiz = <div></div>;

    if (id.id == 0) {
        quiz = <MCQuiz question="Which of the following is NOT a way to improve your credit score?" 
        optionA="Pay your bills on time" 
        optionB="Open as many cards as possible"
        optionC="Max out your cards" 
        optionD="Keep one old line of credit open"
        correctAnswer = {3}
        courseNumber = "course1"
        setState={props.setState}
        state={props.state}/>
    }
    else if (id.id == 1) {
        quiz = <CheckboxQuiz question="Choose all valid risks that should be considered when developing a financial plan" 
        options={["Inflation risk","Income risk","Liquidity risk","Asset risk"]}
        wrongAnswer={"Asset risk"} 
        courseNumber= "course2"
        setState={props.setState}
        state={props.state}/>
    }
    else if (id.id == 2) {
        quiz = <TextBoxQuiz question="What are the three amounts you should consider when calculating interest?"
        correctAnswer = {['principal', 'interest rate', 'time']} 
        courseNumber="course2" 
        setState={props.setState}
        state={props.state}/>
    }
    else if (id.id == 3) {
        let items = [
            {id: 'item-4', content: 'Budget Variable Expenses'},
            {id: 'item-2', content: 'Budget An Emergency Fund and Savings'},
            {id: 'item-0', content: 'Set Financial Goals'},
            {id: 'item-3', content: 'Budget Fixed Expenses'},
            {id: 'item-6', content: 'Review Spending and Saving Patterns'},
            {id: 'item-1', content: 'Estimate Income'},
            {id: 'item-5', content: 'Record Spending Amounts'},
        ];

        let correctAnswer = [
            {id: 'item-0', content: 'Set Financial Goals'},
            {id: 'item-1', content: 'Estimate Income'},
            {id: 'item-2', content: 'Budget An Emergency Fund and Savings'},
            {id: 'item-3', content: 'Budget Fixed Expenses'},
            {id: 'item-4', content: 'Budget Variable Expenses'},
            {id: 'item-5', content: 'Record Spending Amounts'},
            {id: 'item-6', content: 'Review Spending and Saving Patterns'},
        ]
        quiz = <DragDropQuiz question="What is the correct ordering of the budget steps?"
        items={items}
        correctAnswer={correctAnswer}
        courseNumber="course2" 
        setState={props.setState}
        state={props.state}/>
    }
    else if (id.id == 4) {
        quiz = <TextBoxQuiz question="What percent of your total credit limit should you NOT surpass?"
        correctAnswer = {['30%']} 
        courseNumber="course3" 
        setState={props.setState}
        state={props.state}/>
    }
    else if (id.id == 5) {
        quiz = <TextBoxQuiz question="What percent of your total credit limit should you NOT surpass?"
        correctAnswer = {['30%']} 
        courseNumber="course3" 
        setState={props.setState}
        state={props.state}/>
    }
    else if (id.id == 6) {
        quiz = <TextBoxQuiz question="What percent of your total credit limit should you NOT surpass?"
        correctAnswer = {['30%']} 
        courseNumber="course3"
        setState={props.setState}
        state={props.state} />
    }

    return (
        <section className={styles.component}>
            <main className={styles.main}>
                <div className={styles.text}>
                    <CourseContent></CourseContent>
                    {quiz}
                </div>
            </main>
        </section >
    );
};
