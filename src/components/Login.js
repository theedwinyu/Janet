import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import { Button, Row, Col, Card, Modal, Select, Typography } from 'antd';

import Cookie from "js-cookie";

import { Redirect} from "react-router-dom";

const { Title, Paragraph } = Typography;

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const firebaseAppDatabase = firebaseApp.database();

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class Login extends Component {

    constructor() {
        super();
        this.state = {
            exists: false,
            redirect: false,
            showModal: false,
            creditScoreRange: 'good',
        }
        this.checkIfUserExists = this.checkIfUserExists.bind(this);
        this.addUserToDatabase = this.addUserToDatabase.bind(this);
    }

    async componentDidUpdate() {
        if(this.props.user) {
            await this.checkIfUserExists();
            if(this.state.exists) {
                Cookie.set("loggedIn", this.props.user);
                this.setState({
                    redirect: true,
                });
            } else {
                this.showModal();
            }
        }
    }

    async checkIfUserExists() {
        if(this.props.user) {
            let snapshotExists = false;
            await firebaseAppDatabase.ref(`users/${this.props.user.uid}`).once("value", snapshot => {
                if (snapshot.exists()){
                    snapshotExists = true;
                }
            });
            this.state.exists = snapshotExists;
        }
    }

    async addUserToDatabase(creditScoreRange) {
        const progress = {
            creditScoreRange,
            'course1': false,
            'course2': false,
            'course3': false,
        }
        await firebaseAppDatabase.ref(`users/${this.props.user.uid}`).set(progress);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    onChange = (value) => {
        this.state.creditScoreRange = value;
    }

    handleOk = async e => {
        await this.addUserToDatabase(this.state.creditScoreRange);
        Cookie.set("loggedIn", this.props.user);
        this.setState({
            visible: false,
            redirect: true,
        });
    };

    handleCancel = e => {
        this.props.signOut();
        this.setState({
            visible: false,
        });
    };

    render() {
        const {
            user,
            signInWithGoogle,
        } = this.props;

        if(this.state.redirect) {
            return <Redirect to="dashboard"/> 
        }

        return (
            <div className="login-page-background">
                <span className="login-wrapper box-shadow">
                    <Col span={8} className="login-left">
                        <div className="login-centered"></div>
                            <p>Please sign in.</p>
                            <Button type="primary" onClick={signInWithGoogle} style={{borderRadius: '10px'}}>
                                Sign in with Google!
                            </Button>                        </Col>
                    <Col span={16} className="login-right-background" />
                        
                    <Modal
                        title="Select your credit score"
                        visible={this.state.visible && user}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="Register"
                        >
                        <Select defaultValue="good" onChange={this.onChange}>
                            <Select.Option value="poor">300-669</Select.Option>
                            <Select.Option value="good">670-739</Select.Option>
                            <Select.Option value="excellent">740-850</Select.Option>
                        </Select>
                    </Modal>
                </span>
            </div>
        );
    }
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Login);
