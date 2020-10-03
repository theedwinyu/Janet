import React from 'react';
import Cookie from "js-cookie";


import { Avatar, Row } from 'antd';

export const ProfileCard = props => {
    const parsedCookie = JSON.parse(Cookie.get('loggedIn'));
    const name = parsedCookie.user.displayName;
    const creditScoreRange = parsedCookie.progressData.creditScoreRange;

    return (
        <div>
            <Row justify="center">
                <Avatar size={100}>{name}</Avatar>
            </Row>
            <Row justify="center">
                Credit Score: {creditScoreRange}
            </Row>
        </div>
    )
}