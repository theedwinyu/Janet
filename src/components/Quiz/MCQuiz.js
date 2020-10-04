import React, { Component } from 'react';
import { Modal, Radio, Button, notification } from 'antd';
import * as firebase from 'firebase/app';
import 'firebase/database'
import Cookie from "js-cookie";

const firebaseAppDatabase = firebase.database();

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message,
        description
    });
};

class MCQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible: false,
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = async e => {
        
        if(this.isCorrectAnswer()) {
            let parsedCookie = JSON.parse(Cookie.get("loggedIn"));
            if(parsedCookie.progressData[this.props.courseNumber] == false) {
                //update progress bar
                parsedCookie.progressData[this.props.courseNumber] = true;
                Cookie.set("loggedIn", parsedCookie);
                await firebaseAppDatabase.ref(`users/${parsedCookie.user.uid}/${this.props.courseNumber}`).set(true);
                this.props.setState({
                    test: this.props.state.test+1
                });
            }
            this.setState({
                visible: false,
            });
            openNotificationWithIcon('success', 'Correct answer!', 'Good job! You have passed the course!');
        } else {
            openNotificationWithIcon('error', 'Wrong answer!', 'Please try again!');
        }        
    };
    
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    isCorrectAnswer() {
        return this.state.value === this.props.correctAnswer;
    }

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const { value, visible } = this.state;
        const {
            question,
            optionA,
            optionB,
            optionC,
            optionD,
        } = this.props;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                Start quiz
                </Button>
            
                <Modal
                    visible={visible}
                    title={question}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                        Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                        Submit
                        </Button>,
                    ]}
                >
                    <Radio.Group onChange={this.onChange} value={value}>
                    <Radio style={radioStyle} value={1}>
                    {optionA}
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                    {optionB}
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                    {optionC}
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                    {optionD}
                    </Radio>
                </Radio.Group>
                </Modal>
            </div>
        )
    }
}

export default MCQuiz;