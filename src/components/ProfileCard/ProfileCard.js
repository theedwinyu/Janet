import React from 'react';
import { Redirect } from "react-router-dom";
import Cookie from "js-cookie";

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Avatar, Row, Typography, Button, Card, Divider } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const creditScoreRangeMap = {
    'poor': '300-669',
    'good': '670-739',
    'excellent': '740-850'
}

export class ProfileCard extends React.Component {
    constructor() {
        super();
        this.state = {
            'loggedOut': (!Cookie.get('loggedIn')),
        }
    }

    handleSignOut = e => {
        firebase.auth().signOut();
        Cookie.remove('loggedIn');
        this.setState({
            loggedOut: true,
        });
    };

    render() {
        if (this.state.loggedOut) {
            return <Redirect to="/login" />
        }

        const parsedCookie = JSON.parse(Cookie.get('loggedIn'));
        const name = parsedCookie.user.displayName;
        const creditScoreRange = parsedCookie.progressData.creditScoreRange;

        return (
            <div>
                <Card className='box-shadow' style={{margin:'5vh'}}>
                <Row justify="center">
                    <Title level={4}>{name}</Title>
                </Row>
                <Divider />
                <Row justify="center">
                    <Avatar size={100} src={parsedCookie.user.photoURL}/>
                </Row>
                <p></p>
                <Row justify="center">
                    <Text strong>Credit score: {creditScoreRangeMap[creditScoreRange]}</Text>
                </Row>
                <p></p>
                <Row justify="center">
                    <Button type="primary" onClick={this.handleSignOut} style={{borderRadius: '20px'}} icon={<LogoutOutlined />}>Sign out</Button>
                </Row>
                </Card>
            </div>
        )
    }
}