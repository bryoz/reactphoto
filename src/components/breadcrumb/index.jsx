import React from "react";
import * as styles from "./Breadcrumb.module.scss"

const Breadcrumb = ({ pathname }) => {
    let arr = pathname.split("/")
    arr = arr.filter(e => e)
    arr.splice(-1)
    let link = ""

    return(
        <div className={styles.wrapper}>
            {arr.length > 0 &&
                <ul className={styles.breadcrumbs}>
                    {arr.map((crumb, key) => {
                        link = link + "/" + crumb

                        return(
                            <li key={key} className={styles.crumb}>
                                <a href={`${link.replace(/\s/g, "-").toLowerCase()}`}>
                                    {crumb.replace(/-/g, " ")}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}

export default Breadcrumb;
