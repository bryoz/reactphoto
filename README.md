# ReactPhoto

A simple site builder, informed by file structure.

It's my hope that this static site builder will make it painless for photographers looking to build a simple, elegant portfolio to publish their work online.

![Preview of ReactPhoto homepage using placeholder images](./preview.jpg)

## Features

### Easy setup

Following the guide below, which requires very little coding knowledge. Simply add your own folders/subfolders and photos to create your site structure, then run the required npm commands to build your site.

Run ``npm i --legacy-peer-deps`` from the root folder to build the required packages. Run ``gatsby develop`` afterwards to build the site locally.


### Designed for mobile

Designed to respond to browser window size, the site helps your photos look their best whether on mobile or widescreen. Using masonry, the layout adjusts dynamically to fit your images.


### Utilize metadata

To avoid writing the same copy, many times over, **ReactPhoto** will extract EXIF/IPTC information which is commonly added during the post-processing stage, meaning all of your information can be stored in the image file itself.


### Dark theme

Includes light and dark color themes, which adjust automatically based on site visitor preferences.


## Demo

ReactPhoto is currently being used to power [my own photo site, bryPhoto](https://www.bryphoto.co.uk/). I will keep this updated as development continues.

This project was originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It has since been rebuilt from the ground up, and is powered by [Gatsby](https://www.gatsbyjs.com).


## Getting started

Grab this project and install dependencies using [Node Package Manager](https://docs.npmjs.com/about-npm/index.html).

Firstly, you'll need to create a new folder in the src of this project called ``media``. This folder, and its subfolders/files will create your site structure.

Any files in ``media`` root will be ignored. Any folders will create top-level-navigation, with subfolders and images creating subnavigation and photo pages. To an extent, the site will mirror your folder structure.

Navigation and URLs are generated from folder and file names.


### Photo metadata

EXIF metadata is supported, displaying the following attributes when available:
- Camera
- Lens
- FocalLength
- ExposureTime
- ApertureValue
- ISO
- Flash

Additionally, you can use IPTC metadata add a description (using the ``Caption`` field).


### Site configuration

You can edit the ``config`` file in ``src/data/config.json`` to customise your information - including site title, author and social media info. You can also choose whether to aggregate photos to a single navigation link (``aggregateGallery``) - this is the default and recommended when listing multiple albums.

To change the site colors, you can edit the ``themes`` file in ``src/styles/themes.css``. If you like, you can supply your own colours using hex/rgba values respectively. *Please note*, there is a light (default) and dark theme, and your own color values should contrast sufficiently for legibility.

You should also update the markdown in the ``About`` page, via ``src/data/about.mdx``, supplying your own description text here. Images can be updated by replacing those in ``src/images/about``. _Please note: this previously used a separate markdown file, but has since stopped working following updates from Gatsby. I might address this in a future release._


## Credits
Included photos are for demonstration purposes only, and were taken and owned by [Bryan McDowall](https://www.bryphoto.co.uk/). Redistribution and alteration is denied without express permission.

Thanks to [Finn Scott](https://github.com/GeeWizWow) for direct contributions to the original release of ReactPhoto. Thanks also to Thomas Philips for assistace with RegEx queries.