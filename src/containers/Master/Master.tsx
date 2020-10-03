import React from 'react';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Header, ListItemLink, ProfileCard } from '../../components';
import { Items, Item, getExampleItems, AppStore } from '../../state';

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
    return (
        <React.Fragment>
            <Header title="Profile"></Header>
            <ProfileCard />
            <ul>
                {listItems}
            </ul>
        </React.Fragment>
    );
};

