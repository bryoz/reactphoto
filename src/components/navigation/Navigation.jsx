import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import data from "../../data/index.json";

class Navigation extends Component {
    render() {

        const active = {
            fontWeight: "bold",
            color: "pink"
        }

        const pages = Object.values(data);

        return (
            <ul>
                <li>
                    <NavLink activeStyle={active} exact to="/">
                        Home
                    </NavLink>
                </li>
                {pages.map((page) =>(
                    <li key={page.name}>
                        <NavLink activeStyle={active} to={`/${page.path}`}>
                            {page.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        );
    }
}
    
export default Navigation;