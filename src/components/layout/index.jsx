import React from "react";

import Header from "../header";
import Footer from "../footer";

import "../../styles/themes.css"
import * as styles from "./Layout.module.scss"

const Layout = (props) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <Header 
                    isHome={props.isHome ? true : false}
                />

                {props.children}
            </div>

            <Footer />
        </div>
    )
};

export default Layout;