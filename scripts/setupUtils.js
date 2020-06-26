const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const exif = require('exif-reader');
const iptc = require('iptc-reader');
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
        ext: data.ext,
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
        updated: getFileUpdatedDate(img),
        // information: meta.xmp && convert.xml2js(meta.xmp, {compact: false}),
        exif: meta.exif && exif(meta.exif),
        iptc: meta.iptc && iptc(meta.iptc),
    };
};

const getThumbnail = async (children, photos) => {
    if(!children[0]) {
        return null;
    }

    switch(children[0].type) {
        case PageType.Folder: {
            return children[0].thumbnail;
        }
        case PageType.Image: {
            return children[0].id;
        }
        default: {
            return null;
        }
    }
};

const generateThumbnail = async (filePath, width, height) => {
    return await sharp(filePath).resize({
        width: width,
        height: height,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
    }).toBuffer();
}

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
    generateThumbnail,
    sortByDateModified,
};
