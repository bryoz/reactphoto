import React from 'react';
import { Helmet } from 'react-helmet';
import Heading from '../../components/heading/Heading';
import Social from '../../components/social/Social';

import config from '../../data/config.json';
import styles from './About.module.scss';

export default class About extends React.PureComponent {

    render() {
        const site = Object.values(config)[0];

        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>About {site.title}</title>
                    <link rel="canonical" href="" />
                </Helmet>

                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <Heading 
                            tag="h2"
                        >
                            About {site.title}
                        </Heading>
                    </div>
                    <img className={styles.portrait} src="https://via.placeholder.com/1024x500?text=Your+face" alt="" />
                    <div className={styles.copy}>
                        <p>Thanks for checking out ReactPhoto - a simple React portfolio site, built for photographers.</p>
                        <p>React is an incredible tool for building web applications, but it can be a little daunting, especially for those with limited programming experience. It's our hope that this site builder will make it painless for photographers looking to build a React portfolio to publish their work online.</p>
                    </div>
                    <Social 
                        title={"Social"}
                    />
                </div>
            </React.Fragment>
        );
    }

}