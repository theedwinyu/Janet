import React from 'react';

import { Item } from '../../state';
import styles from './Detail.module.scss';

import MCQuiz from '../../components/MCQuiz';

export interface DetailProps {
    item: Item | null
}

export const DetailContainer: React.FC<DetailProps> = (props) => {

    return (
        <section className={styles.component}>
            <main className={styles.main}>
                <div className={styles.text}>
                    <h2>
                        Detail Page
                    </h2>
                    <MCQuiz question="Test" optionA="A" optionB="B"
                        optionC="C" optionD="D"/>
                </div>
            </main>
        </section>
    );
};
