import React from 'react';
import { getExampleItems } from '../../state';
import { useSelector } from 'react-redux';

export const CourseContent = props => {
    let items = useSelector((store) => getExampleItems(store));
    const content = items.items[parseInt(props.id.id)];
    console.log(items);
    console.log(props)
    return (
        <div>
            {content.description}
        </div>
    )
}