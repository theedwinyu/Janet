import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import { Button, Row, Col, Card } from 'antd';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class Login extends Component {
    render() {
        const {
            user,
            signOut,
            signInWithGoogle,
        } = this.props;

        return (
            <div className="App">
                <header className="App-header" style={{ backgroundColor: '#4c29ff'}}>

                    <Card bordered={false} style={{ backgroundColor: '#4c29ff'}}>
                        <Row className="box-shadow" style={{ width:'100%', height:'100%' }}>
                            <Col span={8} style={{ backgroundColor:'white', height: '100vh', color:'black' }}>
                                <Card className="box-shadow login-centered">
                                    <div>
                                    {
                                        user
                                        ? <p>Hello, {user.displayName}</p>
                                        : <p>Please sign in.</p>
                                    }

                                    {
                                        user
                                        ? <Button type="primary" onClick={signOut} style={{borderRadius: '10px'}}>Sign out</Button>
                                        : <Button type="primary" onClick={signInWithGoogle} style={{borderRadius: '10px'}}>Sign in with Google!</Button>
                                    }
                                    </div>
                                </Card>
                            </Col>
                            <Col span={16} className="login-right-background" />
                        </Row>
                    </Card>
                </header>
            </div>
        );
    }
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Login);