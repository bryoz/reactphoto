import React from 'react';
import RouteCustom from '../components/route/RouteCustom';
import Page from '../components/page/Page';

export const createRoutes = (pages) => {
    return pages.reduce(
        (routes, data) => {
            const nextRoutes = [
                ...routes,
                <RouteCustom
                    exact
                    key={data.slug} 
                    path={data.slug}
                    component={Page}
                    data={data} 
                />,
            ];

            return data.children 
                ? [ ...nextRoutes, ...createRoutes(data.children) ] 
                : [ ...nextRoutes ];
        },
        [],
    );
};