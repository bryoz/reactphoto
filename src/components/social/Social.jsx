import React from 'react';
import classNames from 'classnames/bind'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Heading from '../heading/Heading'; 

import styles from './Social.module.scss';
import { config } from '../../data';
const cx = classNames.bind(styles); 

export default class Social extends React.PureComponent {
    render() {
        library.add(fab);

        const social = config.social;

        return (
            <div className={styles.wrapper}>
                <Heading tag="h3">{this.props.title}</Heading>
                <ul className={styles.list}>
                    {config.instagram &&
                        <li className={cx("item", "instagram")}>
                            <a
                                className={styles.link} 
                                href={`https://instagram.com/${config.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={['fab', 'instagram']}
                                    className={styles.icon}
                                />
                            </a>
                        </li>
                    }
                    {social.map((item) =>(
                        (item.url && item.url.length > 0) ?
                        <li key={item.name} className={cx("item", item.name)}>
                            <a 
                                className={styles.link}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                            {item.icon ?
                                <FontAwesomeIcon
                                    icon={['fab', item.icon]}
                                    className={styles.icon}
                                />
                            :
                                item.title
                            }
                            </a>
                        </li>
                        : null
                    ))}
                </ul>
            </div>
        )
    }
}