import { thumbnails, photos } from '../data';

export const getPhotoById = id => {
    return photos[id];
};

export const getThumbnailById = id => {
    return thumbnails[id];
};

export const getFileByPath = path => {
    return require('../media' + path);
};