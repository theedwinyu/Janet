import React, { Component } from 'react';
import { Modal, Button, notification, Checkbox } from 'antd';
import * as firebase from 'firebase/app';
import 'firebase/database'
import Cookie from "js-cookie";

const firebaseAppDatabase = firebase.database();

const CheckboxGroup = Checkbox.Group;

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message,
        description
    });
};


class CheckboxQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedList: [],
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

    onChange = checkedList => {
        this.setState({
            checkedList,
        });
    };

    isCorrectAnswer() {
        for(let index in this.state.checkedList) {
            if(this.state.checkedList[index] === this.props.wrongAnswer) {
                return false;
            }
        }
        
        return true;
    }

    render() {
        const { visible } = this.state;
        const {
            question,
            options,
        } = this.props;

        return(
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
                    <CheckboxGroup
                        options={options}
                        value={this.state.checkedList}
                        onChange={this.onChange}
                    />
                </Modal>
            </div>
        );
    }

}

export default CheckboxQuiz;