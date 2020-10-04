import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Media from 'react-media';
import { mediaQueries } from '../../utils';
import styles from './MasterDetail.module.scss';

export interface MasterDetailProps {
    MasterType: any,
    masterProps: any,
    DetailType: any,
    detailProps: any
}

export const MasterDetail: React.FC<MasterDetailProps> = (props) => {
    let { path } = useRouteMatch() as any;
    const [state, setState] = useState({
        test:1,
    })
    const master = (
        <props.MasterType {...props.masterProps}
            data-test="Master" setState = {setState} state={state}/>);
    
    const detail = (
        <props.DetailType {...props.detailProps}
            data-test="Detail" setState = {setState} state={state}/>);

    return (
        <span style={{backgroundColor: '#c9fcc7', width:'100%', height:'100%', display: 'flex'}}>
        <Media query={mediaQueries.md}>
            {matches =>
                matches ? (
                    <Switch>
                        <Route exact path={`${path}`}>
                            {master}
                        </Route>
                        <Route path={`${path}/detail/:id`}>
                            {detail}
                        </Route>
                    </Switch>
                ) : (
                        <section className={styles.component}>
                            <section className={styles.master}>
                                <Route path={`${path}`}>
                                    {master}
                                </Route>
                            </section>
                            <section className={styles.detail}>
                                <Switch>
                                    <Route exact path={`${path}`}>
                                        {detail}
                                    </Route>
                                    <Route path={`${path}/detail/:id`}>
                                        {detail}
                                    </Route>
                                </Switch>
                            </section>
                        </section>
                    )
            }
        </Media>
        </span> 
    );
};