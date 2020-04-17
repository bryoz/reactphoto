import React from 'react';
import Gallery from 'react-photo-gallery';
import Thumbnail from '../thumbnail/Thumbnail';
import Heading from '../heading/Heading';

export default class Gear extends React.PureComponent {

    columns = (containerWidth) => {
        let columns = 3;
        if (containerWidth >= 500) columns = 3;
        if (containerWidth >= 900) columns = 4;
        return columns;
    }

    thumbnail = ({key, photo, index, left, top, margin}) => (
        <a href={photo.url} key={key} target="_blank" rel="noopener noreferrer">
            <Thumbnail
                photo={photo}
                index={index}
                left={left}
                top={top}
                margin={margin}
            />
        </a>
    );

    renderInventory = () => {
        const items = this.props.inventory.map(item => ({
            key: item.name,
            src: item.src,
            url: item.url, //this is being passed to the img tag
            alt: item.title,
            width: 1,
            height: 1,
        }));

        let columns = this.columns;

        if(columns > items.length) {
            columns = items.length;
        }

        return (
            <Gallery 
                direction="column" 
                photos={items} 
                columns={columns} 
                renderImage={this.thumbnail}     
            />
        );
    }

    render() {
        return (
            <React.Fragment>
                <Heading tag="h3">{this.props.title}</Heading>
                {this.renderInventory()}
            </React.Fragment>
        );
    }

}