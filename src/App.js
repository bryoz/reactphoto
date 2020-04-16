import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import About from './views/about/About';
import Latest from './views/latest/Latest';

// Helpers
import { createRoutes } from './helpers/router';

// Resources
import { photoPages, config } from './data';
import styles from './App.module.scss';

export default function App() {
    const pages = Object.values(photoPages);
    const routes = createRoutes(pages);

    return (
        <Router>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{config.title}</title>
                <link rel="canonical" href="" />
            </Helmet>
            <div className={styles.app}>
                <div className={styles.page}>
                    <Header />
                    <article className={styles.wrapper}>
                        <Switch>
                            <Route
                                key="about" 
                                path="/about"
                                component={About}
                            />
                            <Route
                                key="latest" 
                                path="/"
                                exact
                                component={Latest}
                            />
                            {routes}
                        </Switch>
                    </article>
                </div>
                <Footer />
            </div>
        </Router>
	);
}