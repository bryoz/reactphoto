import React from 'react';

export default class Footer extends React.PureComponent {

    render() {
        return (
            <footer
                style={{
                    fontSize: "12px",
                    textAlign: "center"
                }}
            >
                <p>&copy; ReactPhoto 2020 - all rights reserved</p>
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