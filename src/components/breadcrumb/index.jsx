import React from "react";
import { Link } from "gatsby"

import * as styles from "./Breadcrumb.module.scss"

const Breadcrumb = ({showPhotoLink, location}) => {

    let arr = location.pathname.split("/")
    arr = arr.filter(e =>  e)
    arr.splice(-1)
    let link = ""
    
    return(
        <div className={styles.wrapper}>

            {arr.length > 0 || showPhotoLink ?
                <ul className={styles.breadcrumbs}>
                    {showPhotoLink &&
                        <li className={styles.crumb}>
                            <Link
                                to={"/photos"}
                            >
                                Photos
                            </Link>
                        </li>
                    }

                    {arr.length > 0 && arr.map((crumb, key) => {
                        link = link + "/" + crumb

                        return(
                            <li key={key} className={styles.crumb}>
                                <Link
                                    to={`${link.replace(/\s/g, "-").toLowerCase()}`}
                                >
                                    {crumb.replace(/-/g, " ")}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            : null }
        </div>
    )
}

export default Breadcrumb;