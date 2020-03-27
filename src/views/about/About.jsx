import React from 'react';
import { Helmet } from 'react-helmet';
import Heading from '../../components/heading/Heading';
import Gear from '../../components/gear/Gear';
import Social from '../../components/social/Social';

import styles from './About.module.scss';

let social = [
    {
        "name": "twitter",
        "title": "Twitter",
        "url": "https://twitter.com/bryoz",
    },
    {
        "name": "instagram",
        "title": "Instagram",
        "url": "https://twitter.com/bryoz",
    },
    {
        "name": "linkedin",
        "title": "LinkedIn",
        "url": "https://twitter.com/bryoz",
    },
];

let gear = [
    {
        "name": "bodyfujifilmxt2",
        "title": "Fujifilm X-T2 Body",
        "url": "https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_t2/",
        "src": "https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_t2/img/index/img_main01.jpg"
    },
]

export default class About extends React.PureComponent {

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>About ReactPhoto</title>
                    <link rel="canonical" href="" />
                </Helmet>

                <div className={styles.wrapper}>
                    <Heading tag="h2">About ReactPhoto</Heading>
                    <img className={styles.portrait} src="https://via.placeholder.com/1024x500?text=Your+face" alt="" />
                    <p>blep</p>

                    <Gear 
                        title={"Equipment"}
                        inventory={gear}
                    />

                    <Social 
                        title={"Social"}
                        profiles={social}
                    />

                </div>
            </React.Fragment>
        );
    }

}