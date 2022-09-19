import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Breadcrumb from "../components/breadcrumb"

import * as styles from "./Photo.module.scss"


export default function Photo(props) {
    const photo = props.data.file.childImageSharp.gatsbyImageData
    const folder = props.data.file.relativeDirectory
    const meta = props.data.file.childImageSharp.fields.exif.meta
    const raw = props.data.file.childImageSharp.fields.exif.raw
    const desc = props.data.file.childImageSharp.fields.exif.raw.image.ImageDescription

    let shutter
    if (raw.exif.ExposureTime < 1) {
        let fraction = 1 / raw.exif.ExposureTime
        shutter = "1/" + fraction
    } else {
        shutter = raw.exif.ExposureTime
    }

    return (
        <Layout>
            <Breadcrumb
                location={props.location}
            />

            <h1 className={styles.title}>{props.data.file.name}</h1>
            <GatsbyImage
                image={photo}
                alt=""
            />

            <div className={styles.details}>
                {meta.dateTaken != null &&
                    <p className={styles.date}>{meta.dateTaken}</p>
                }
                {desc != null && desc.length > 0 &&
                    <p className={styles.desc}>{raw.image.ImageDescription}</p>
                }
            </div>

            <ul className={styles.meta}>
                {raw.image.Make != null && raw.image.Model != null &&
                    <li>
                        <p className={styles.field}>Camera</p>
                        <p className={styles.value}>{raw.image.Make} {raw.image.Model}</p>
                    </li>
                }
                {(raw.exif.LensMake != null || raw.exif.LensModel != null) && raw.exif.LensMake !== "Apple" &&
                    <li>
                        <p className={styles.field}>Lens</p>
                        <p className={styles.value}>{raw.exif.LensMake} {raw.exif.LensModel}</p>
                    </li>
                }

                <li>
                    <p className={styles.field}>Focal length</p>
                    <p className={styles.value}>{raw.exif.FocalLength}mm</p>
                </li>
                <li>
                    <p className={styles.field}>Exposure</p>
                    <p className={styles.value}>{shutter}</p>
                </li>
                <li>
                    <p className={styles.field}>Aperture</p>
                    <p className={styles.value}>ƒ/{raw.exif.ApertureValue.toFixed(2)}</p>
                </li>
                <li>
                    <p className={styles.field}>ISO</p>
                    <p className={styles.value}>{raw.exif.ISO}</p>
                </li>

                {raw.exif.LensMake !== "Apple" &&
                    <li>
                        <p className={styles.field}>Flash</p>
                        <p className={styles.value}>{raw.exif.Flash > 0 ? "On" : "Off"}</p>
                    </li>
                }
            </ul>

            <div className={styles.backWrapper}>
                <Link
                    to={`/photos/${folder.replace(/\s/g, "-").toLowerCase()}`}
                    className={styles.back}
                >
                    Back to "{folder}"
                </Link>
            </div>
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
                fields {
                    exif {
                        meta {
                            dateTaken(formatString: "ddd, DD MMM YYYY hh:mm:ss")
                        }
                        raw {
                            exif {
                                ExposureTime
                                ApertureValue
                                ISO
                                FocalLength
                                Flash
                                LensMake
                                LensModel
                            }
                            image {
                                ImageDescription
                                Make
                                Model
                            }
                        }
                    }
                }
            }
            name
            relativeDirectory
        }
    }
`