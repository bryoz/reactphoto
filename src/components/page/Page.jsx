import React from 'react';
import Gallery from '../gallery/Gallery';
import Folder from '../folder/Folder';
import SinglePhoto from '../single-photo/SinglePhoto';
import { PageType } from '../../constants/Page';

const getPageType = (data) => {
    const childType = data
        && data.children
        && data.children.length > 0
        && data.children[0].type;

    return childType === PageType.Image 
        ? PageType.Gallery 
        : data.type;
};

export default function Page (props) {
    switch (getPageType(props.data)) {

        case PageType.Folder:
            return <Folder data={props.data} />;

        case PageType.Gallery:
            return <Gallery data={props.data} />;

        case PageType.Image:
            return <SinglePhoto data={props.data} />;

        default:
            return null;
    }
}