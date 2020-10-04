import React from 'react';

import styles from './Detail.module.scss';
import { Item } from '../../state';
import { useParams } from 'react-router-dom';
import { CourseContent } from '../../components';


export interface DetailProps {
    item: Item | null
}

export const DetailContainer: React.FC<DetailProps> = (props) => {
    let id = useParams();

    if (Object.keys(id).length === 0) {
        id = { id: 0 };
    }
    return (
        <section className={styles.component}>
            <main className={styles.main}>
                <div className={styles.text}>
                    <CourseContent id={id == undefined ? 0 : id}></CourseContent>
                </div>
            </main>
        </section>
    );
};
