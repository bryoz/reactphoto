import React, { useState, useCallback } from "react"
import { useMediaQuery } from "react-responsive"

import Links from "../links"
import NavigationMenu from "../navigation-menu"

import * as styles from "./Header.module.scss"
import classNames from "classnames/bind"


export default function Header({ isHome, config, folders }) {
    const cx = classNames.bind(styles)

    const classes = cx(
        "wrapper",
        isHome ? "home" : null
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
        <header className={classes}>
            <div className={styles.siteName}>
                <h1 className={`title ${styles.title}`}>{config.title}</h1>
                {isHome &&
                    <h2 className={styles.subtitle}>{config.subtitle}</h2>
                }
            </div>

            {isFullSize ?
                <Links config={config} folders={folders} />
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
                        <NavigationMenu config={config}>
                            <Links
                                config={config}
                                folders={folders}
                                onClick={() => setMenuState(false)}
                                isMenu
                            />
                        </NavigationMenu>
                    }
                </React.Fragment>
            }
        </header>
    )
}
