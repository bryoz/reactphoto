import React from "react";
import * as styles from "./Footer.module.scss"

export default function Footer({ config }) {
    return (
        <footer className={styles.wrapper}>
            <p>{config.title} by {config.author}. Powered by <a className={styles.link} target="_blank" rel="noreferrer" href="https://www.github.com/bryoz/reactphoto">ReactPhoto</a>.</p>
        </footer>
    )
}
