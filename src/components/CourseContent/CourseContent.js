import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import path1 from "../../md-files/1.md";
import path2 from "../../md-files/2.md";
import path3 from "../../md-files/3.md";
import path4 from "../../md-files/4.md";
import poorPath from "../../md-files/poor-tips.md";
import goodPath from "../../md-files/good-tips.md";
import excellentPath from "../../md-files/excellent-tips.md";
import { AutoComplete, Card } from 'antd';

const cardStyle = {
    margin: "auto",
};

export const CourseContent = props => {
    let id = useParams();
    if (Object.keys(id).length === 0) {
        id = { id: 0 };
    }
    const [state, setState] = useState({
        terms: null,
        imagename: "",
        title: "",
    })

    if (id.id == 0) {
        fetch(path1).then((response) => response.text()).then((text) => {
            setState({ terms: text, imagename: "image1", title: "What's in a Credit Score?" })
        })
    }
    else if (id.id == 1) {
        fetch(path2).then((response) => response.text()).then((text) => {
            setState({ terms: text, imagename: "image2" })
        })
    }
    else if (id.id == 2) {
        fetch(path3).then((response) => response.text()).then((text) => {
            setState({ terms: text })
        })
    }
    else if (id.id == 3) {
        fetch(path4).then((response) => response.text()).then((text) => {
            setState({ terms: text })
        })
    }
    else if (id.id == 4) {
        fetch(poorPath).then((response) => response.text()).then((text) => {
            setState({ terms: text })
        })
    }
    else if (id.id == 5) {
        fetch(goodPath).then((response) => response.text()).then((text) => {
            setState({ terms: text })
        })
    }
    else if (id.id == 6) {
        fetch(excellentPath).then((response) => response.text()).then((text) => {
            setState({ terms: text })
        })
    }


    return (
        <div className="container-fluid">
            <Card style={cardStyle} title={state.title}>
                <div class={state.imagename}></div>
                <ReactMarkdown source={state.terms} />
            </Card>
        </div >
    )
}