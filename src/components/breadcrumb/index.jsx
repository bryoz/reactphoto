import React from "react";
import { Link } from "gatsby"

import * as styles from "./Breadcrumb.module.scss"

const Breadcrumb = ({location}) => {

    let arr = location.pathname.split("/")
    arr = arr.filter(e =>  e)
    arr.splice(-1)
    let link = ""
    
    return(
        <div className={styles.wrapper}>

            {arr.length > 0 &&
                <ul className={styles.breadcrumbs}>
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
            }
        </div>
    )
}

export default Breadcrumb;