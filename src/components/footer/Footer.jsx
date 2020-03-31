import React from 'react';

import config from '../../data/config.json';

export default class Footer extends React.PureComponent {

    render() {
        const site = Object.values(config)[0];

        return (
            <footer
                style={{
                    fontSize: "12px",
                    textAlign: "center"
                }}
            >
                <p><a href={site.url} target="_blank" rel="noopener noreferrer">{site.title}</a> - by {site.author}</p>
                <ul
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        listStyle: "none",
                        margin: "0",
                        padding: "0"
                    }}
                >
                    <li>blep</li>
                    <li>blep</li>
                    <li>blep</li>
                </ul>
            </footer>
        );
    }

}