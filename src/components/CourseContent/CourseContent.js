import React from 'react';
import { getExampleItems } from '../../state';
import { useSelector } from 'react-redux';

export const CourseContent = props => {
    let items = useSelector((store) => getExampleItems(store));
    const content = items.items[parseInt(props.id.id)]
    return (
        <div>
            {content.description}
        </div>
    )
}