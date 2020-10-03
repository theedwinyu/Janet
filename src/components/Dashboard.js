import React, { Component } from 'react';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from "react-router-dom";
import Cookie from "js-cookie";

import { Button } from 'antd';

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

    render() {
        
        if(this.state.loggedOut) {
            return <Redirect to="/Login"/>  
        }

        const parsedCookie = JSON.parse(Cookie.get('loggedIn'));
        return (
            <div>
                <p>{parsedCookie.user.displayName}</p>
                <Button type="primary" onClick={this.handleSignOut} style={{borderRadius: '10px'}}>Sign out</Button>
            </div>
        );
    }
}

export default Dashboard;