import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "./components/navigation/Navigation";
import Photos from "./views/gallery/Photos";
import data from "./data/index.json";

export default function App() {

    const pages = Object.values(data);

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
                        <Route key={page.path} path={`/${page.path}`}> 
                            <Photos filename={page.filename} />
                        </Route>
                    )}

                </Switch>
            </div>
        </Router>
	);
}