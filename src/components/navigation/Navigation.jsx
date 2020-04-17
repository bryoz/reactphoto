import React, { useState, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';

// JSX Imports
import NavigationMenu from '../navigation-menu/NavigationMenu';
import Links from './NavigationLinks';

// Resources
import { photoPages } from '../../data';
import styles from './Navigation.module.scss';

// Constants
const pages = Object.values(photoPages);

export default function Navigation() {
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
        <div className={styles.wrapper}>
            {!isFullSize &&
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
                                pages={pages}
                            />
                        </NavigationMenu>
                    }
                </React.Fragment>
            }
            {isFullSize &&
                <Links
                    pages={pages}
                    onClick={() => setMenuState(false)}
                />
            }
        </div>
    );
}