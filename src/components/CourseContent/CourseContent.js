import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import termsFrPath from "../../md-files/1.md"


export const CourseContent = props => {
    let id = useParams();
    if (Object.keys(id).length === 0) {
        id = { id: 0 };
    }
    const [state, setState] = useState({
        terms: null
    })

    fetch(termsFrPath).then((response) => response.text()).then((text) => {
        setState({ terms: text })
    })

    return (
        <div>
            <ReactMarkdown source={state.terms} />
        </div>
    )
}