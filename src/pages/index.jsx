import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PhotoHandler from "../components/photo-handler"

// markup
const IndexPage = ({ data }) => {
    return (
        <Layout>
            <main>
                <title>Home Page</title>
                <h1>
                    It is here!
                </h1>
                <p>Output all images as thumbnails</p>
                <PhotoHandler
                    photos={data.allFile.edges}
                />
            </main>
        </Layout>
    )
}

export default IndexPage

export const query = graphql`
    {
        allFile (
            filter: {
                sourceInstanceName: {
                    eq: "media"
                }
            }, 
            limit: 20, 
            sort: {
                order: DESC,
                fields: birthtime
            }
        ){
            edges {
                node {
                    childImageSharp {
                        gatsbyImageData
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`
