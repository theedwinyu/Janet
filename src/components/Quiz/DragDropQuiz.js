import React, { Component } from 'react';
import { Modal, Button, notification } from 'antd';
import * as firebase from 'firebase/app';
import 'firebase/database'
import Cookie from "js-cookie";
import _ from 'lodash'

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const firebaseAppDatabase = firebase.database();

const grid = 8;

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "#c9fcc7" : "white",
  
    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
});

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message,
        description
    });
};

class DragDropQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            items: props.items,
        };
        this.onDragEnd = this.onDragEnd.bind(this);
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

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.state.items,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
            items
        });
    }

    isCorrectAnswer() {
        return _.isEqual(this.state.items, this.props.correctAnswer);
    }

    render() {
        
        const { visible } = this.state;
        const {
            question,
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
                    <div style={{display: 'flex', alignItems: 'center'}}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            >
                            {this.state.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}
                                    >
                                    {item.content}
                                    </div>
                                )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>
                        )}
                        </Droppable>
                    </DragDropContext>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default DragDropQuiz;