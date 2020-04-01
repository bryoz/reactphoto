import React, { useState, useEffect } from 'react';
import Heading from '../heading/Heading';
import { useLocation, Link } from 'react-router-dom';
import { map, without, reduce, last } from 'underscore';

export default function Breadcrumb(props) {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(
        () => setBreadcrumbs(
            reduce(
                without(location.pathname.split('/'), ""),
                (agg, segment, index) => !segment 
                    ? agg 
                    : [
                        ...agg,
                        {
                            label: `/${segment}`,
                            slug: index === 0 ? `/${segment}` : last(agg).slug + `/${segment}`,
                        },
                    ],
                [],
            )
        ),
        [ location.pathname ],
    );

    if(breadcrumbs.length < 2) {
        return null;
    };

    return (
        <Heading tag="h5">
            {map(breadcrumbs, (page, index) => 
                index === breadcrumbs.length - 1 
                    ? null
                    : <Link key={page.slug} to={page.slug}>{page.label}</Link>
            )}
        </Heading>
    );
}