import React from "react";
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "./components/navigation/Navigation";
import siteNav from "./data/index.json";
import RouteCustom from "./components/route/RouteCustom";
import Page from "./components/page/Page";

export default function App() {

    const pages = Object.values(siteNav);

    return (
        <Router>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Photography</title>
                <link rel="canonical" href="https://bryphoto.co.uk" />
            </Helmet>
            <div className="App">
                <Navigation />

                <p>Junk n' other stuff</p>
                <Switch>
                    {pages.map(page => 
                        <RouteCustom 
                            filename={page.filename} 
                            key={page.path} 
                            path={`/${page.path}`}
                            component={Page}
                        /> 
                    )}
                </Switch>
            </div>
        </Router>
	);
}