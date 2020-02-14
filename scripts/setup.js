// Create json file to map folder/file structure of site
// Create json file to create navigation based on content
// Process images to be optimised for web and this application

// Import requirements
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");


// Image directory setup
// Name of image folder, in root (can be updated if required eg. artwork)
const imgFolder = "photography";

// Relative path to image folder from this script
const dir = "../" + imgFolder;
// Absolute path to project root
const projectRoot = path.resolve(process.cwd(), "..");
// Absolute path to image folder
const imgRoot = path.resolve(projectRoot, imgFolder);


// Function to create relative paths
const relPath = function(pathOne, pathTwo) {
    return path.relative(pathOne, pathTwo);
};

    //     console.log("Updated files.json with latest data")
    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }

// Calculate the image orientation
const orientation = function(w, h) {
    if(w - h > 0) {
        return "landscape";
    } if(w - h < 0) {
        return "portrait";
    } if(w - h === 0) {
        return "square";
    } else {
        return null;
    }
};

// Get the image metadata using sharp
const sharpMeta = async function(img) {
    const image = sharp(img);
    const meta = await image.metadata();
    return {
        format: meta.format,
        width: meta.width,
        height: meta.height,
        orientation: orientation(meta.width, meta.height)
    };
};


// Read image folder directory contents and create an object
const dirToObj = function(dir, done) {
    var results = [];

    fs.readdir(dir, function(err, list) {
        if (err) {
            return done(err);
        }

        var pending = list.length;

        if (!pending) {
            return done(null);
        }

        list.forEach(async function (file) {

        file = path.resolve(dir, file);

        const stat = await fs.promises.stat(file);

            if (stat && stat.isDirectory()) {

                dirToObj(file, function(err, res) {
                    results.push({
                        name: path.basename(file),
                        type: "folder",
                        isPage: true,
                        path: relPath(imgRoot, file),
                        children: res
                    });
                    if (!--pending) {
                        done(null, results);
                    }
                });

            }
            else {

                var ext = path.extname(file);

                // Only return jpg images
                if (ext === ".jpg") {
                    results.push({
                        type: "image",
                        name: path.parse(file).name,
                        path: relPath(imgRoot, path.parse(file).dir),
                        src: relPath(imgRoot, file),
                        meta: await sharpMeta(file)
                    });
                }

                if (!--pending) {
                    done(null, results);
                }
            }
        });
    });
};


// Push all object data to single json file/object
dirToObj(dir, async function(err, res){
    if(err)
        console.error(err);

    const overview = {};

    //for each gallery
    await asyncForEach(res, async entry => {
        await fs.promises.writeFile(`../src/data/${entry.name}.json`, JSON.stringify(entry, null, 4), "utf-8");
        overview[entry.name] = {
            filename: `${entry.name}.json`,
            name: entry.name,
            path: entry.path,
            thumbnail: null, //TODO: Add thumbnails for each page
        };
    })
    await fs.promises.writeFile("../src/data/index.json", JSON.stringify(overview, null, 4), "utf-8");

    // const overview = {};
    console.log("Updated files.json with latest data")

    
    // fs.writeFile("../src/data/files.json", JSON.stringify(res, null, 4), "utf-8", function(err) {
    //     if (err) throw err
    //     console.log("Updated files.json with latest data")
    // })
});