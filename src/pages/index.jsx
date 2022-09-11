import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PhotoHandler from "../components/photo-handler"

// markup
const IndexPage = ({ data }) => {
    return (
        <Layout
            isHome
        >
            <main>
                <title>{data.site.siteMetadata.title}</title>
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
        site {
            siteMetadata {
                title
            }
        }
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
