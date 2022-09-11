import React, { useState, useCallback } from "react"
import { graphql, StaticQuery, } from "gatsby"

import { useMediaQuery } from "react-responsive"

import Links from "../../components/links"
import NavigationMenu from "../../components/navigation-menu"

import * as styles from "./Header.module.scss"
import classNames from "classnames/bind"


export default function Header(props) {
    const cx = classNames.bind(styles)

    const classes = cx(
        "wrapper",
        props.isHome ? "home" : null
    );

    const [ menuActive, setMenuState ] = useState(false);
    const isFullSize = useMediaQuery({
        query: '(min-width: 768px)'
    });

    const isFullSizeCb = useCallback(
        () => {
            if (menuActive && isFullSize) {
                setMenuState(false);
            }
        },
        [ isFullSize, menuActive ],
    );

    isFullSizeCb();

    return (
        <StaticQuery
            query={graphql`
                query HeadingQuery {
                    site {
                        siteMetadata {
                            title
                            subtitle
                        }
                    }
                }
            `}
            render={data => (
                <header
                    className={classes}
                >
                    <div className={styles.siteName}>
                        <h1 className={`title ${styles.title}`}>{data.site.siteMetadata.title}</h1>
                        {props.isHome &&
                            <h2 className={styles.subtitle}>{data.site.siteMetadata.subtitle}</h2>
                        }
                    </div>

                    {isFullSize ?
                        <Links />
                    :
                        <React.Fragment>
                            <div
                                className={styles.menu}
                                onClick={() => setMenuState(!menuActive)}
                            >
                                {menuActive
                                    ? <span>Close</span>
                                    : <span>Menu</span>
                                }
                            </div>
                            {menuActive &&
                                <NavigationMenu>
                                    <Links
                                        onClick={() => setMenuState(false)}
                                        isMenu
                                    />
                                </NavigationMenu>
                            }
                        </React.Fragment>
                    }
                </header>
            )}
        />
    )
}