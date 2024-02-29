import React from 'react';

const ImageComponent = ({ imageUrl }) => {
    return (
        <img src={imageUrl} alt='lol' className="w-full h-auto max-w-xs max-h-72" />
    );
};

export default ImageComponent;
