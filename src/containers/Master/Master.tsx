import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Header, ProfileCard } from '../../components';
import { CheckCircleTwoTone, MinusCircleOutlined } from '@ant-design/icons';

import Cookie from 'js-cookie';
import { Card, List, Divider,Progress } from 'antd';
import { NavLink } from 'react-router-dom';

import styles from '../../components/ListItemLink/ListItemLink.module.scss';

export interface MasterProps {
}
const poorItems = [
    { id: 0, title: 'What\'s in a Credit Score?', description: 'Find out what affects your score', courseName: 'course1' },
    { id: 3, title: 'Creating and Implementing a Budget', description: 'Budgeting 101', courseName: 'course2' },
    { id: 4, title: 'Improving Your Credit Score (Poor)', description: "For those with poor credit score", courseName: 'course3' },
];

const goodItems = [
    { id: 0, title: 'What\'s in a Credit Score?', description: 'Find out what affects your score', courseName: 'course1' },
    { id: 1, title: 'Financial Planning', description: 'Staying on track', courseName: 'course2' },
    { id: 5, title: 'Improving Your Credit Score (Good)', description: "For those with good credit score", courseName: 'course3' },
];

const excellentItems = [
    { id: 0, title: 'What\'s in a Credit Score?', description: 'Find out what affects your score', courseName: 'course1' },
    { id: 2, title: 'Financial Goals', description: 'Planning for your next big purchase!', courseName: 'course2' },
    { id: 6, title: 'Improving Your Credit Score (Excellent)', description: "For those with excellent credit score", courseName: 'course3' }
];


const calculateProgressScore = (parsedCookie: any) => {
    let numFinished = 0;
    if(parsedCookie.progressData.course1) {
        numFinished += 1;
    }
    if(parsedCookie.progressData.course2) {
        numFinished += 1;
    }
    if(parsedCookie.progressData.course3) {
        numFinished += 1;
    }
    
    return Math.floor(numFinished/3 * 100);
}

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
                <Progress type="circle" percent={calculateProgressScore(parsedCookie)} />
                <Divider>Courses</Divider>
                <List
                    itemLayout="horizontal"
                    dataSource={items}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={parsedCookie.progressData[item.courseName] ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <MinusCircleOutlined />}
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

