const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const { PageType } = require('../src/constants/Page');
const { getSharpMeta, scanDirectory, parseFileInfo, getThumbnail } = require('./setupUtils.js');


// Source directory to scan
const imgSrc = path.resolve(__dirname, process.argv[2] || '../photography');

// Output directories
const dataOut = path.resolve(__dirname, process.argv[3] || '../src/data');
const imgOut = path.resolve(__dirname, process.argv[4] || '../src/media');


// Files to post-process
const filesToCopy = [];


// File Processor
// Checks every entry in our src dir, if it's an image file builds meta, otherwise keeps scanning
const processFile = async (file) => {

    const fileInfo = parseFileInfo(file, imgSrc);
    const isDirectory = fs.statSync(file).isDirectory();

    if (!isDirectory) {
        filesToCopy.push({
            src: fileInfo.originalPath,
            dst: path.join(imgOut, fileInfo.src),
        });
    }

    return isDirectory 
        ? {
            type: PageType.Folder,
            name: fileInfo.name,
            slug: fileInfo.slug,
            children: await scanDirectory(file, processFile),
            thumbnail: await getThumbnail(file),
        }
        : {
            type: PageType.Image,
            name: fileInfo.name,
            slug: fileInfo.slug,
            src: fileInfo.src,
            meta: await getSharpMeta(file)
        };
};


// Do our work - Scan our img src directory
// pass in our custom function that processes each result
scanDirectory(imgSrc, processFile)
    .then(async result => {

        // remove any existing files in the our dir & write our new file
        await fsExtra.emptydir(dataOut);
        await fs.promises.writeFile(
            path.resolve(dataOut, 'data.json'),
            JSON.stringify(result, null, 4),
        );

        // if we have any images to copy, empty the image dir and copy them across
        // We could also apply post-processing at the same time
        if (filesToCopy.length > 0) {

            await fsExtra.emptyDir(imgOut);
            filesToCopy.forEach(f => fsExtra.copySync(f.src, f.dst));
        }
    });
