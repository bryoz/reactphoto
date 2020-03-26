import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Helmet } from "react-helmet";
import siteNav from "./data/index.json";
import RouteCustom from "./components/route/RouteCustom";
import Page from "./components/page/Page";
import Cursor from "./components/cursor/Cursor";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import About from "./views/about/About";

import styles from "./App.module.scss";

export default function App() {

    const pages = Object.values(siteNav);

    return (
        <Router>
            <Helmet>
                <meta charSet="utf-8" />
                <title>ReactPhoto</title>
                <link rel="canonical" href="" />
            </Helmet>
            <div className={styles.app}>
                <Cursor />
                <Header />
                <article className={styles.wrapper}>
                    <Switch>
                        <Route
                            key="about" 
                            path="/about"
                            component={About}
                        />
                        {pages.map(page => 
                            <RouteCustom 
                                filename={page.filename} 
                                key={page.path} 
                                path={`/${page.path}`}
                                component={Page}
                            />
                        )}
                    </Switch>
                </article>
            </div>
            <Footer />
        </Router>
	);
}