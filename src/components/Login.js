import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import { Button, Row, Col, Card, Typography } from 'antd';
const { Title, Paragraph } = Typography;

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
        <div className="login-page-background">
          <span className="login-wrapper box-shadow">
            <Col span={8} className="login-left">
              <div className="login-centered">
                {
                  user
                  ? <p>Hello, {user.displayName}</p>
                  : <p>Please sign in.</p>
                }

                {
                  user
                  ?
                  <Button type="primary" onClick={signOut} style={{borderRadius: '10px'}}>
                    Sign out
                  </Button>
                  :
                  <Button type="primary" onClick={signInWithGoogle} style={{borderRadius: '10px'}}>
                    Sign in with Google!
                  </Button>
                }
              </div>
            </Col>
            <Col span={16} className="login-right-background" />
          </span>
        </div>
      );
    }
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Login);
