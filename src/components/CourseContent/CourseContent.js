import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import path1 from "../../md-files/1.md"
import path2 from "../../md-files/2.md"


export const CourseContent = props => {
    let id = useParams();
    if (Object.keys(id).length === 0) {
        id = { id: 0 };
    }
    const [state, setState] = useState({
        terms: null,
        imagename: ""
    })


    if (id.id == 0) {
        fetch(path1).then((response) => response.text()).then((text) => {
            setState({ terms: text , imagename: "image1"})
        })
    }
    else if (id.id == 1) {
        fetch(path2).then((response) => response.text()).then((text) => {
            setState({ terms: text , imagename: "image2"})
        })
    }
    else if (id.id == 2) {
        fetch(path2).then((response) => response.text()).then((text) => {
            setState({ terms: text , imagename: ""})
        })
    }
    else if (id.id == 3) {
        fetch(path2).then((response) => response.text()).then((text) => {
            setState({ terms: text , imagename: ""})
        })
    }


    return (
        
        <div>
            <div class={state.imagename}></div>
            <ReactMarkdown source={state.terms} />
        </div>
    )
}