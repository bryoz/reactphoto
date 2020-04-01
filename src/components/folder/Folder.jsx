import React from 'react';
import { map } from 'underscore';
import { Link } from 'react-router-dom';

export default function Folder(props) {
    return (
        <React.Fragment>
            <p>Breadcrumb / To </p>

            {map(props.data.children, c => (
                <React.Fragment key={c.slug}>
                    <Link to={c.slug}>
                        <img src={c.thumbnail} alt="" />
                    </Link>
                    <Link to={c.slug}>
                        {c.name}
                    </Link>
                </React.Fragment>
            ))}

        </React.Fragment>
    );
}