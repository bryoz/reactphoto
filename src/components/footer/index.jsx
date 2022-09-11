import React from "react";
import { graphql, StaticQuery } from "gatsby"

import * as styles from "./Footer.module.scss"

export default function Header() {

    return (
        <StaticQuery
            query={graphql`
                query FooterQuery {
                    site {
                        siteMetadata {
                            title
                            author
                        }
                    }
                }
            `}
            render={data => (
                <footer
                    className={styles.wrapper}
                >
                    <p>{data.site.siteMetadata.title} by {data.site.siteMetadata.author}. Powered by <a className={styles.link} target="_blank" rel="noreferrer" href="https://www.github.com/bryoz/reactphoto">ReactPhoto</a>.</p>
                </footer>
            )}
        />
    )
}