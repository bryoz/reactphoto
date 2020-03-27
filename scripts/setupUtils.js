const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { Orientation } = require('../src/constants/Image');

const parseFileInfo = (filePath, srcDir = '') => {
    const data = path.parse(filePath);
    const re = RegExp(`\\${path.sep}`, 'g');

    return {
        originalPath: filePath,
        name: data.name,
        src: (
            filePath
                .replace(srcDir, '')
                .replace(re, '/')
        ),
        slug: (
            filePath
                .replace(srcDir, '')
                .replace(data.ext, '')
                .replace(re, '/')
        ),
    };
};

const getOrientation = (w, h) => {
    if(w > h) {
        return Orientation.Landscape;
    } if(h > w) {
        return Orientation.Portrait;
    } if(w === h) {
        return Orientation.Square;
    } else {
        return Orientation.Unknown;
    }
};

const getSharpMeta = async img => {
    const image = sharp(img);
    const meta = await image.metadata();
    return {
        format: meta.format,
        width: meta.width,
        height: meta.height,
        orientation: getOrientation(meta.width, meta.height)
    };
};

const getThumbnail = async (img) => {
    // TODO: generate thumbnail
    return 'https://via.placeholder.com/400x400';
};

const scanDirectory = function(dir, processFile) {
    return fs.promises
        .readdir(dir)
        .then(files => files.map(file => path.resolve(dir, file)))
        .then(files => files.map(processFile))
        .then(promises => Promise.all(promises));
};

module.exports = {
    getOrientation,
    getSharpMeta,
    scanDirectory,
    parseFileInfo,
    getThumbnail,
};
