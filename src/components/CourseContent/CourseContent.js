import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import path1 from "../../md-files/1.md";
import path2 from "../../md-files/2.md";
import path3 from "../../md-files/3.md";
import path4 from "../../md-files/4.md";
import poorPath from "../../md-files/poor-tips.md";
import goodPath from "../../md-files/good-tips.md";
import excellentPath from "../../md-files/excellent-tips.md";
import { Card } from 'antd';


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
    async function fetchData() {
        if (id.id == 0) {
            await fetch(path1).then((response) => response.text()).then((text) => {
                setState({ terms: text, imagename: "image1", title: "What's in a Credit Score?" })
            });
        }
        else if (id.id == 1) {
            await fetch(path2).then((response) => response.text()).then((text) => {
                setState({ terms: text, imagename: "image2", title: "Financial Planning" })
            });
        }
        else if (id.id == 2) {
            await fetch(path3).then((response) => response.text()).then((text) => {
                setState({ terms: text, title: "Financial Goals -- Planning for Your Next Big Purchase" })
            });
        }
        else if (id.id == 3) {
            await fetch(path4).then((response) => response.text()).then((text) => {
                setState({ terms: text, title: "Creating and Implementing a Budget" })
            });
        }
        else if (id.id == 4) {
            await fetch(poorPath).then((response) => response.text()).then((text) => {
                setState({ terms: text, imagename: "image3", title: "Improve Your Poor Credit Score" })
            });
        }
        else if (id.id == 5) {
            await fetch(goodPath).then((response) => response.text()).then((text) => {
                setState({ terms: text, imagename: "image3", title: "Improve Your Good Credit Score" })
            });
        }
        else if (id.id == 6) {
            await fetch(excellentPath).then((response) => response.text()).then((text) => {
                setState({ terms: text, imagename: "image3", title: "Maintain Your Excellent Credit Score" })
            });
        }
    }

    useEffect(() => {
        fetchData();
    }, [id.id]);


    return (
        <div style={{
            padding: "30px",
        }}>
            <Card title={state.title}>
                <div class={state.imagename} style={{ marginBottom: "10%" }}></div>
                <ReactMarkdown source={state.terms} />
                {props.quiz}
            </Card>
        </div >
    )
}