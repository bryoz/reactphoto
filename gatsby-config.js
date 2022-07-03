module.exports = {
    siteMetadata: {
        title: "ReactPhoto",
        siteUrl: "https://www.github.com/bryoz/reactphoto",
        "subtitle": "Selected photographic works of Bryan McDowall",
        "author": "Bryan McDowall",
        "email": "bryan.mcdowall@gmail.com",
        "instagram": "bryanmcdowall",
        "aggregateGallery": true,
        "galleryTitle": "Photos",
        "storeName": "Store",
        "storeUrl": "",
        "social": [
            {
                "name": "linkedin",
                "title": "LinkedIn",
                "url": "https://www.linkedin.com/in/bryoz"
            },
            {
                "name": "twitter",
                "title": "Twitter",
                "url": "https://twitter.com/bryoz"
            },
            {
                "name": "github",
                "title": "GitHub",
                "url": "https://github.com/bryoz"
            }
        ]
    },
    plugins: [
        "gatsby-plugin-image",
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
              gatsbyRemarkPlugins: [
                {
                  resolve: `gatsby-remark-images`,
                  options: {
                    maxWidth: 1200,
                  },
                },
              ],
            },
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sharp-exif",
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "images",
                "path": "./src/images/"
            },
            __key: "images"
        }, {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "pages",
                "path": "./src/pages/"
            },
            __key: "pages"
        }, {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `media`,
                path: "./src/media/"
            }
        }, {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "data",
                path: "./src/data",
            }
        }, {
            resolve: "gatsby-plugin-sass"
        }
    ]
};