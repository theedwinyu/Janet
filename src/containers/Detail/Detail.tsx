import React from 'react';

import { Item } from '../../state';
import styles from './Detail.module.scss';

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
                </div>
            </main>
        </section>
    );
};
