const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { Orientation } = require('../src/constants/Image');
const { PageType } = require('../src/constants/Page');
const { v4 } = require('uuid');

const ImageFormats = {
    '.jpg': 'Jpeg',
    '.jpeg': 'Jpeg',
    '.png': 'Png',
    '.gif': 'Gif',
};

const TextFormats = {
    '.txt': 'Text',
    '.md': 'Markdown',
    '.html': 'Html',
};

const getFileType = extension => {
    return ImageFormats[extension] 
        ? PageType.Image
        : TextFormats[extension]
            ? PageType.Text
            : null;
};

const parseFileInfo = (filePath, srcDir = '') => {
    const re = RegExp(`\\${path.sep}`, 'g');
    const data = path.parse(filePath);
    const stat = fs.statSync(filePath);

    const isDirectory = stat.isDirectory();
    const fileType = isDirectory ? PageType.Folder : getFileType(data.ext);

    return {
        uuid: v4(),
        originalPath: filePath,
        name: data.name,
        type: fileType,
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
                .replace(/\s+?/g, '_')
                .toLowerCase()
        ),
    };
};

const getFileCreatedDate = (path) => {
    const stats = fs.statSync(path)
    return stats.birthtime
}

const getFileUpdatedDate = (path) => {
    const stats = fs.statSync(path)
    return stats.mtime
}

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
        orientation: getOrientation(meta.width, meta.height),
        created: getFileCreatedDate(img),
        updated: getFileUpdatedDate(img)
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
        .then(promises => Promise.all(promises))
        .then(results => results.filter(r => !!r));
};

const sortByDateModified = files => {
    return files.sort((a, b) => {
        return new Date(b.meta.updated) - new Date(a.meta.updated);
    });
};

module.exports = {
    getFileCreatedDate,
    getFileUpdatedDate,
    getOrientation,
    getSharpMeta,
    scanDirectory,
    parseFileInfo,
    getThumbnail,
    sortByDateModified,
};
