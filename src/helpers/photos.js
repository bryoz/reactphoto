import { photos } from '../data';

export const getPhotoById = id => {
    return photos[id];
};

export const getFileByPath = path => {
    return require('../media' + path);
};