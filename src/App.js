import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Components
import Breadcrumb from './components/breadcrumb/Breadcrumb';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import About from './views/about/About';

// Helpers
import { createRoutes } from './helpers/router';

// Resources
import siteNav from './data/data.json';
import config from './data/config.json';
import styles from './App.module.scss';

export default function App() {

    const site = Object.values(config)[0];
    const pages = Object.values(siteNav);
    const routes = createRoutes(pages);

    return (
        <Router>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{site.title}</title>
                <link rel="canonical" href="" />
            </Helmet>
            <div className={styles.app}>
                <Header />
                <Breadcrumb />
                <article className={styles.wrapper}>
                    <Switch>
                        <Route
                            key="about" 
                            path="/about"
                            component={About}
                        />
                        {routes}
                    </Switch>
                </article>
            </div>
            <Footer />
        </Router>
	);
}