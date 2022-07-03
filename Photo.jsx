import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Breadcrumb from "../components/breadcrumb"

export default function Photo({ data }) {
    const photo = data.file.childImageSharp.gatsbyImageData
    const folder = data.file.relativeDirectory

    return (
        <Layout>
            <Breadcrumb
                name={folder}
                link={`/${folder.replace(/\s/g, "-").toLowerCase()}`}
            />
            <h1>{data.file.name}</h1>
            <GatsbyImage
                image={photo}
                alt=""
            />
        </Layout>
    )
}

export const query = graphql`
    query($relativePath: String!) {
        file(relativePath: { eq: $relativePath }) {
            childImageSharp {
                gatsbyImageData(
                    width: 1920,
                    quality: 100
                )
            }
            name
            relativeDirectory
        }
    }
`