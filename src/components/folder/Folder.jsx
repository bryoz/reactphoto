import React from 'react';
import { map } from 'underscore';
import { Link } from 'react-router-dom';

export default function Folder(props) {
    return (
        <React.Fragment>

            {map(props.data.children, c => (
                <Link to={c.slug} key={c.slug}>
                    {c.name}
                </Link>
            ))}

        </React.Fragment>
    );
}