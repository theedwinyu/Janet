import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Header, ProfileCard } from '../../components';

import Cookie from 'js-cookie';
import { Card, List, Divider,Progress } from 'antd';
import { NavLink } from 'react-router-dom';

import styles from '../../components/ListItemLink/ListItemLink.module.scss';

export interface MasterProps {
}
const poorItems = [
    { id: 0, title: 'What\'s in a Credit Score?', description: 'Find out what affects your score' },
    { id: 3, title: 'Creating and Implementing a Budget', description: 'Budgeting 101' },
    { id: 4, title: 'Improving Your Credit Score (Poor)', description: "For those with poor credit score" },
];

const goodItems = [
    { id: 0, title: 'What\'s in a Credit Score?', description: 'Find out what affects your score' },
    { id: 1, title: 'Financial Planning', description: 'Staying on track' },
    { id: 5, title: 'Improving Your Credit Score (Good)', description: "For those with good credit score" },
];

const excellentItems = [
    { id: 0, title: 'What\'s in a Credit Score?', description: 'Find out what affects your score' },
    { id: 2, title: 'Financial Goals', description: 'Planning for your next big purchase!' },
    { id: 6, title: 'Improving Your Credit Score (Excellent)', description: "For those with excellent credit score" }
];

export const MasterContainer: React.FC<MasterProps> = (props) => {
    let { path } = useRouteMatch() as RouteProps;


    const parsedCookie = JSON.parse(Cookie.get('loggedIn')!);
    const creditScoreRange = parsedCookie.progressData.creditScoreRange;

    let items;

    if (creditScoreRange == "poor") {
        items = poorItems;
    }
    else if (creditScoreRange == "good") {
        items = goodItems;
    }
    else {
        items = excellentItems;
    }


    return (
        <div>
            <React.Fragment>
                {/* <Header title={parsedCookie.user.displayName}></Header> */}
                <ProfileCard/>
                <Card className='box-shadow' style={{margin:'5vh'}}>
                <Progress type="circle" percent={75} />
                <Divider>Courses</Divider>
                <List
                    itemLayout="horizontal"
                    dataSource={items}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={
                            // <a href={path+ "/detail/" + item.id}>{item.title}</a>
                            <NavLink exact to={path+ "/detail/" + item.id}
                                className={styles.component}
                                activeClassName={styles.active}>
                                {item.title}
                            </NavLink>
                        }
                        description={item.description}
                        />
                    </List.Item>
                    )}
                />
                {/* <ul>
                    {listItems}
                </ul> */}
                </Card>
            </React.Fragment>
        </div>
    );
};

