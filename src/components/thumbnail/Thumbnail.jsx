import React from "react";

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
        <div
            style={{ 
                margin,
                top: top,
                left: left,
                height: photo.height,
                width: photo.width,
                ...cont
            }}
        >
            {/* TODO: Add routing to this component with using photo.src */}
            <img
                {...photo}
                alt={photo.title}
            />
        </div>
    );
};

export default Thumbnail;