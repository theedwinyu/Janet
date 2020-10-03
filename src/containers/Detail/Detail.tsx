import React from 'react';

import styles from './Detail.module.scss';
import { Item } from '../../state';
import { useParams } from 'react-router-dom';
import { CourseContent } from '../../components';


export interface DetailProps {
    item: Item | null
}

export const DetailContainer: React.FC<DetailProps> = (props) => {
    const id = useParams();

    return (
        <section className={styles.component}>
            <main className={styles.main}>
                <div className={styles.text}>
                    <CourseContent id={id}></CourseContent>
                </div>
            </main>
        </section>
    );
};
