import React, { Component } from 'react';
import {Modal, Radio, Input, Button} from 'antd';
import * as firebase from 'firebase/app';
import 'firebase/database'
import Cookie from "js-cookie";

const firebaseAppDatabase = firebase.database();

class MCQuiz extends Component {
    constructor(props) {
        super();
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

    handleOk = e => {
        console.log(this.state.value);
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

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
            correctAnswer,
            courseNumber,
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