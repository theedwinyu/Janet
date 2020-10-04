import React from 'react';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Header, ProfileCard } from '../../components';

import Cookie from 'js-cookie';
import { Card, List } from 'antd';
import { NavLink } from 'react-router-dom';

import styles from '../../components/ListItemLink/ListItemLink.module.scss';

export interface MasterProps {
}

export const MasterContainer: React.FC<MasterProps> = (props) => {
    let { path } = useRouteMatch() as RouteProps;
    let items = [
        { id: 0, title: 'What\'s in a Credit Score?', description: 'Find out what affects your score' },
        { id: 1, title: 'Financial Planning', description: 'Staying on track' },
        { id: 2, title: 'Financial Goals', description: 'Planning for your next big purchase!' },
        { id: 3, title: 'Creating and Implementing a Budget', description: 'Budgeting 101' },
    ];

    const parsedCookie = JSON.parse(Cookie.get('loggedIn')!);

    return (
        <React.Fragment>
            <div>
                <Header title={parsedCookie.user.displayName}></Header>
                <ProfileCard />
                <Card title="Courses" style={{ margin: '5vh' }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={items}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        // <a href={path+ "/detail/" + item.id}>{item.title}</a>
                                        <NavLink exact to={path + "/detail/" + item.id}
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
            </div>

        </React.Fragment>
    );
};

