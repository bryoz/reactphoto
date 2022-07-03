import React from "react";

import Header from "../header";
// import { Footer } from "../footer/Footer";

import * as styles from "./Layout.module.scss"

const Layout = ({ children }) => {

    return (
        <div className={styles.wrapper}>
            <Header />

            <div>
                {children}
            </div>

            {/* <Footer 
                className={styles.footer}
                links={links}
            /> */}
        </div>
    )
};

export default Layout;