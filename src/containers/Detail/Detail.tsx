import React from 'react';

import styles from './Detail.module.scss';
import { Item } from '../../state';
import { CourseContent } from '../../components';


export interface DetailProps {
    item: Item | null
}

export const DetailContainer: React.FC<DetailProps> = (props) => {

    return (
        <section className={styles.component}>
            <main className={styles.main}>
                <div className={styles.text}>
                    <CourseContent></CourseContent>
                </div>
            </main>
        </section >
    );
};
