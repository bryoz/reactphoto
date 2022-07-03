import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Social from "../components/social"

import * as styles from "./about.module.scss"

export const query = graphql`{
    about: mdx(
      fileAbsolutePath: {regex: "src/data/"}
      frontmatter: {tag: {eq: "about"}}
    ) {
        frontmatter {
            title
            headerImage {
                childImageSharp {
                    gatsbyImageData(
                        quality: 80,
                        formats: [WEBP, JPG],
                        layout: FULL_WIDTH
                    )
                }
            }
            authorImage {
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
            }
        }
        body
    }
}`

const About = ( props ) => {
    const { body, frontmatter } = props.data.about;

    return (
        <Layout>
            <div className={styles.header}>
                <GatsbyImage
                    image={frontmatter.headerImage.childImageSharp.gatsbyImageData}
                    alt=""
                    className={styles.headerImage}
                />
            </div>
            <div className={styles.avatar}>
                <GatsbyImage
                    image={frontmatter.authorImage.childImageSharp.gatsbyImageData}
                    alt=""
                />
            </div>
            <Social />
            <h1>{frontmatter.title}</h1>
            <MDXRenderer>{body}</MDXRenderer>
        
        </Layout>
    )
}

export default About