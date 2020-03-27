import React from 'react';
import { Route } from 'react-router-dom';


export default function RouteCustom (props) {
    const Comp = props.component;

    return (
        <Route path={props.path}>
            <Comp {...props} />
        </Route>
    );
}