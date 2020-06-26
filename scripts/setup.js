const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const { PageType } = require('../src/constants/Page');
const { getSharpMeta, scanDirectory, parseFileInfo, getThumbnail, generateThumbnail, sortByDateModified } = require('./setupUtils.js');
const { first } = require('underscore');

// Source directory to scan
const imgSrc = path.resolve(__dirname, process.argv[2] || '../photography');

// Output directories
const dataOut = path.resolve(__dirname, process.argv[3] || '../src/data');
const imgOut = path.resolve(__dirname, process.argv[4] || '../src/media');


// Our list of photos
const photos = {};
const sourcePhotos = {};
const thumbnails = {};

// Number of latest photos to get for front page
const numberOfLatestPhotos = 10;

// File Processor
// Checks every entry in our src dir, if it's an image file builds meta, otherwise keeps scanning
const processFile = async (file) => {

    const fileInfo = parseFileInfo(file, imgSrc);

    if (fileInfo.type === PageType.Image) {
        sourcePhotos[fileInfo.uuid] = fileInfo;

        photos[fileInfo.uuid] = {
            id: fileInfo.uuid,
            slug: fileInfo.slug,
            name: fileInfo.name,
            src: fileInfo.src,
            meta: await getSharpMeta(file),
        };
    }

    switch (fileInfo.type) {
        case PageType.Image: {
            return {
                slug: fileInfo.slug,
                type: fileInfo.type,
                id: fileInfo.uuid,
            };
        }

        case PageType.Folder: {
            const folderDetails = {
                type: fileInfo.type,
                name: fileInfo.name,
                slug: fileInfo.slug,
                children: await scanDirectory(file, processFile),
            };

            folderDetails.thumbnail = await getThumbnail(folderDetails.children, photos);

            if(folderDetails.thumbnail) {
                const sourcePhoto = sourcePhotos[folderDetails.thumbnail];
                thumbnails[folderDetails.thumbnail] = path.join('/', 'thumb', sourcePhoto.src);
            }

            return folderDetails;
        }

        default: {
            return null;
        }
    }
};


// Do our work - Scan our img src directory
// pass in our custom function that processes each result
scanDirectory(imgSrc, processFile)
    .then(async pageList => {

        // Sort our photos by most recently updated and create a list of their ids
        const mostRecent = first(
            sortByDateModified(Object.values(photos)).map(photo => photo.id),
            numberOfLatestPhotos,
        );

        // Create our final data object
        const result = {
            photoPages: pageList,
            photos: photos,
            thumbnails: thumbnails,
            mostRecent: mostRecent,
        };

        // remove any existing files in the our dir & write our new file
        await fsExtra.remove(`${dataOut}/data.json`);
        await fs.promises.writeFile(
            path.resolve(dataOut, 'data.json'),
            JSON.stringify(result, null, 4),
        );

        
        // if we have any images to copy, empty the image dir and copy them across
        // We could also apply post-processing at the same time
        const filesToCopy = Object.keys(sourcePhotos);
        if (filesToCopy.length > 0) {

            await fsExtra.emptyDir(imgOut);

            filesToCopy.forEach(async f => {
                if(thumbnails[f]) {
                    const thumb = await generateThumbnail(
                        sourcePhotos[f].originalPath,
                        400,
                        400,
                    );

                    fsExtra.outputFileSync(path.join(imgOut, thumbnails[f]), thumb);
                }

                fsExtra.copySync(
                    sourcePhotos[f].originalPath,
                    path.join(imgOut, sourcePhotos[f].src),
                );
            });
        }
    });
