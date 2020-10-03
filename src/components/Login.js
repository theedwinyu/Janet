import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import { Button } from 'antd';

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
            <div>
            {
                user
                  ? <p>Hello, {user.displayName}</p>
                  : <p>Please sign in.</p>
            }

            {
                user
                ? <Button type="primary" onClick={signOut}>Sign out</Button>
                : <Button type="primary" onClick={signInWithGoogle}>Sign in with Google!</Button>
            }
            </div>
        );
    }
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Login);