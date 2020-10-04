import React from 'react';
import { Redirect } from "react-router-dom";
import Cookie from "js-cookie";

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Avatar, Row, Typography, Button, Card } from 'antd';

const { Text } = Typography;

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
            return <Redirect to="/Login" />
        }

        const parsedCookie = JSON.parse(Cookie.get('loggedIn'));
        const name = parsedCookie.user.displayName;
        const creditScoreRange = parsedCookie.progressData.creditScoreRange;

        return (
            <div>
                <Card style={{ margin: '5vh' }}>
                    <Row justify="center">
                        <Avatar size={100} src={parsedCookie.user.photoURL} />
                    </Row>
                    <p></p>
                    <Row justify="center">
                        <Text strong>Credit score: {creditScoreRangeMap[creditScoreRange]}</Text>
                    </Row>
                    <p></p>
                    <Row justify="center">
                        <Button type="primary" onClick={this.handleSignOut} style={{ borderRadius: '10px' }}>Sign out</Button>
                    </Row>
                </Card>
            </div>
        )
    }
}