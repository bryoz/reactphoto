import React from 'react';

const cont = {
    backgroundColor: "#eee",
    // cursor: "pointer",
    overflow: "hidden",
    position: "absolute"
};

const Thumbnail = ({
    photo,
    left,
    top,
    margin
}) => {

    return (
        <img
            {...photo}
            style={{ 
                margin,
                top: top,
                left: left,
                height: photo.height,
                width: photo.width,
                ...cont
            }}
            alt={photo.alt}
        />
    );
};

export default Thumbnail;