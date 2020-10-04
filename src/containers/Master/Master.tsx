import React from 'react';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Header, ListItemLink, ProfileCard } from '../../components';
import { Items, Item, getExampleItems, AppStore } from '../../state';
import Cookie from 'js-cookie';
import { Card, List } from 'antd';
import { NavLink } from 'react-router-dom';

import styles from '../../components/ListItemLink/ListItemLink.module.scss';

export interface MasterProps extends Items {
}

export const MasterContainer: React.FC<MasterProps> = (props) => {
    let { path } = useRouteMatch() as RouteProps;
    let { items } = useSelector((store: AppStore) => getExampleItems(store));
    const listItems = items.map((item: Item) =>
        <li key={item.id}>
            <ListItemLink
                to={`${path}/detail/${item.id}`} item={item} />
        </li>
    );

    const parsedCookie = JSON.parse(Cookie.get('loggedIn')!);
    
    return (
        <React.Fragment>
            <div>
                <Header title={parsedCookie.user.displayName}></Header>
                <ProfileCard />
                <Card title="Courses" style={{margin:'5vh'}}>
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
            </div>
           
        </React.Fragment>
    );
};

