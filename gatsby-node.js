const { createFilePath } = require("gatsby-source-filesystem");
const path = require('path')

exports.onCreateNode = ({
    node,
    getNode,
    getNodesByType,
    actions
}) => {
    const { createNodeField } = actions;

    if (node.sourceInstanceName === "media") {
        const slug = createFilePath({ node, getNode }).replace(/\s/g, "-").toLowerCase();

        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    };

    const {
        createParentChildLink
    } = actions

    if (node.internal.type === "Directory") {
        if (node.sourceInstanceName === "media") {
            // in some case the trailing slash is missing.
            // Always add it and normalize the path to remove duplication
            const parentDirectory = path.normalize(node.dir + "/")
            const parent = getNodesByType("Directory").find(
                n => path.normalize(n.absolutePath + "/") === parentDirectory
            )
            if (parent) {
                node.parent = parent.id
                createParentChildLink({
                    child: node,
                    parent: parent
                })
            }
        }
    }
};

exports.createPages = async function ({ actions, graphql }) {
    const { data } = await graphql(`
        query {
            allFile(filter: {sourceInstanceName: {eq: "media"}}) {
                group(field: relativeDirectory) {
                    fieldValue
                }
                edges {
                    node {
                        childImageSharp {
                            gatsbyImageData(layout: FIXED)
                        }
                        relativePath
                        relativeDirectory
                        name
                        fields {
                            slug
                        }
                    }
                }
            }

            thumbnails: allFile(filter: {sourceInstanceName: {eq: "media"}}) {
                group(field: relativeDirectory, limit: 1) {
                    fieldValue
                    nodes {
                        id
                    }
                }
            }
        }
    `)

    data.allFile.edges.forEach(photo => {
        const slug = photo.node.fields.slug
        actions.createPage({
            path: slug,
            component: require.resolve(`./src/templates/Photo.jsx`),
            context: { relativePath: photo.node.relativePath },
        })
    })

    data.allFile.group.forEach(folder => {
        const slug = folder.fieldValue.replace(/\s/g, "-").toLowerCase();
        actions.createPage({
            path: slug,
            component: require.resolve(`./src/templates/PhotoIndex.jsx`),
            context: {
                slug: slug,
                dir: folder.fieldValue,
                dirRegex: "/^" + folder.fieldValue + "//"
            },
        })
    })
}