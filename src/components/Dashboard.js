import React, { Component } from 'react';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from "react-router-dom";
import Cookie from "js-cookie";

import { Button, Col, Avatar, Card, Tree, Typography} from 'antd';

const { Text } = Typography;

const treeData = [{
    title: 'course 1',
    key: '0-0',
    children: [
    {
        title: 'course 1.1',
        key: '0-0-0',
        children: [
        {
            title: 'course 1.1.1',
            key: '0-0-0-0',
        },
        {
            title: 'course 1.1.2',
            key: '0-0-0-1',
        },
        ],
    },
    {
        title: 'course 1.2',
        key: '0-0-1',
        children: [
        {
            title: (
            <span
                style={{
                color: '#1890ff',
                }}
            >
                course 1.2.1
            </span>
            ),
            key: '0-0-1-0',
        },
        ],
    },
    ],
}];

class Dashboard extends Component {

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

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    
    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };

    render() {

        if (this.state.loggedOut) {
            return <Redirect to="/login" />
        }

        const parsedCookie = JSON.parse(Cookie.get('loggedIn'));
        
        return (
            <div className="login-page-background">
                <span className="login-wrapper box-shadow">
                    <Col span={8} className="login-left">
                        <div className="login-centered" style={{marginTop:'10vh'}}>
                        <Avatar size={64} src={parsedCookie.user.photoURL} />
                        <p>{parsedCookie.user.displayName}</p>
                        <Button type="primary" onClick={this.handleSignOut} style={{borderRadius: '10px'}}>Sign out</Button>
                        <br></br>
                        <p></p>
                        <Text strong>Current Credit score: </Text> <Text>{parsedCookie.progressData.creditScoreRange}</Text>
                        <p></p>
                        <Card>
                        <Tree
                            checkable
                            defaultExpandedKeys={['0-0-0', '0-0-1']}
                            defaultSelectedKeys={['0-0-0', '0-0-1']}
                            defaultCheckedKeys={['0-0-0', '0-0-1']}
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}
                            treeData={treeData}
                        />
                        </Card>
                        </div>
					</Col>
                    <Col span={16} className="login-right-background" />
                </span>
            </div>
        );
    }
}

export default Dashboard;