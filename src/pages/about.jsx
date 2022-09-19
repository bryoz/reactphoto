import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Social from "../components/social"

import * as styles from "./about.module.scss"

export const query = graphql`{
    aboutHeader: file(
        sourceInstanceName: {eq: "images"},
        relativeDirectory: {eq: "about"}
        name: {eq: "about-header"}
    ) {
        childImageSharp {
            gatsbyImageData(
                quality: 80,
                formats: [WEBP, JPG],
                layout: FULL_WIDTH
            )
        }
    },
    authorImage: file(
        sourceInstanceName: {eq: "images"},
        relativeDirectory: {eq: "about"}
        name: {eq: "author"}
    ) {
        childImageSharp {
            gatsbyImageData(
                quality: 80,
                formats: [WEBP, JPG],
                height: 280,
                width: 280,
                transformOptions: {
                    cropFocus: CENTER
                }
            )
        }
    },
    previewImage: file(
        sourceInstanceName: {eq: "images"},
        relativeDirectory: {eq: "about"}
        name: {eq: "preview"}
    ) {
        childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
        }
    }
}`


const About = ( props ) => {

    return (
        <Layout>
            <div className={styles.header}>
                <GatsbyImage
                    image={props.data.aboutHeader.childImageSharp.gatsbyImageData}
                    alt=""
                    className={styles.headerImage}
                />
            </div>
            <div className={styles.avatar}>
                <GatsbyImage
                    image={props.data.authorImage.childImageSharp.gatsbyImageData}
                    alt=""
                />
            </div>

            <div className={styles.social}>
                <Social />
            </div>

            <h1 className={styles.title}>Welcome to ReactPhoto</h1>
            <div className={styles.content}>
                <p>A simple site builder, informed by file structure.</p>
                <p>It's my hope that this static site builder will make it painless for photographers looking to build a simple, elegant portfolio to publish their work online.</p>
                <GatsbyImage
                    image={props.data.previewImage.childImageSharp.gatsbyImageData}
                    alt=""
                    className={styles.preview}
                />
                <h2 id="features">Features</h2>
                <h3 id="easy-setup">Easy setup</h3>
                <p>Following the guide below, which requires very little coding knowledge. Simply add your own folders/subfolders and photos to create your site structure, then run the required npm commands to build your site.</p>
                <p>Run <code>npm i --legacy-peer-deps</code> from the root folder to build the required packages. Run <code>gatsby develop</code> afterwards to build the site locally.</p>
                <h3 id="designed-for-mobile">Designed for mobile</h3>
                <p>Designed to respond to browser window size, the site helps your photos look their best whether on mobile or widescreen. Using masonry, the layout adjusts dynamically to fit your images.</p>
                <h3 id="utilize-metadata">Utilize metadata</h3>
                <p>To avoid writing the same copy, many times over, <strong>ReactPhoto</strong> will extract EXIF/IPTC information which is commonly added during the post-processing stage, meaning all of your information can be stored in the image file itself.</p>
                <h3 id="dark-theme">Dark theme</h3>
                <p>Includes light and dark color themes, which adjust automatically based on site visitor preferences.</p>
                <h2 id="demo">Demo</h2>
                <p>ReactPhoto is currently being used to power <a href="https://www.bryphoto.co.uk/">my own photo site, bryPhoto</a>. I will keep this updated as development continues.</p>
                <p>This project was originally bootstrapped with <a href="https://github.com/facebook/create-react-app">Create React App</a>. It has since been rebuilt from the ground up, and is powered by <a href="https://www.gatsbyjs.com">Gatsby</a>.</p>
                <h2 id="getting-started">Getting started</h2>
                <p>Grab this project and install dependencies using <a href="https://docs.npmjs.com/about-npm/index.html">Node Package Manager</a>.</p>
                <p>Firstly, you'll need to create a new folder in the src of this project called <code>media</code>. This folder, and its subfolders/files will create your site structure.</p>
                <p>Any files in <code>media</code> root will be ignored. Any folders will create top-level-navigation, with subfolders and images creating subnavigation and photo pages. To an extent, the site will mirror your folder structure.</p>
                <p>Navigation and URLs are generated from folder and file names.</p>
                <h3 id="photo-metadata">Photo metadata</h3>
                <p>EXIF metadata is supported, displaying the following attributes when available:</p>
                <ul>
                <li>Camera</li>
                <li>Lens</li>
                <li>FocalLength</li>
                <li>ExposureTime</li>
                <li>ApertureValue</li>
                <li>ISO</li>
                <li>Flash</li>
                </ul>
                <p>Additionally, you can use IPTC metadata add a description (using the <code>Caption</code> field).</p>
                <h3 id="site-configuration">Site configuration</h3>
                <p>You can edit the <code>config</code> file in <code>src/data/config.json</code> to customise your information - including site title, author and social media info. You can also choose whether to aggregate photos to a single navigation link (<code>aggregateGallery</code>) - this is the default and recommended when listing multiple albums.</p>
                <p>To change the site colors, you can edit the <code>themes</code> file in <code>src/styles/themes.css</code>. If you like, you can supply your own colours using hex/rgba values respectively. There is a light (default) and dark theme, and your own color values should contrast sufficiently for legibility.</p>
                <p>You should also update the html in the <code>About</code> page, via <code>src/pages/about.jsx</code>, supplying your own description text here. Images can be updated by replacing those in <code>src/images/about</code>. <em>Please note: this previously used a separate markdown file, but has since stopped working following updates from Gatsby. I might address this in a future release.</em></p>
                <h2 id="credits">Credits</h2>
                <p>Included photos are for demonstration purposes only, and were taken and owned by <a href="https://www.bryphoto.co.uk/">Bryan McDowall</a>. Redistribution and alteration is denied without express permission.</p>
                <p>Thanks to <a href="https://github.com/GeeWizWow">Finn Scott</a> for direct contributions to the original release of ReactPhoto. Thanks also to Thomas Philips for assistace with RegEx queries.</p>
            </div>
        
        </Layout>
    )
}

export default About