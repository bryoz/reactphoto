import React from "react";
import { map } from "underscore";
import { Helmet } from "react-helmet";
import { Switch, Link } from "react-router-dom";
import RouteCustom from "../route/RouteCustom";
import Gallery from "react-photo-gallery";
import Thumbnail from "../thumbnail/Thumbnail";

const PageTypes = {
    "folder": "folder",
    "image": "image",
    "text": "text",
};

export default class Page extends React.PureComponent {

    columns = (containerWidth) => {
        let columns = 1;
        if (containerWidth >= 500) columns = 2;
        if (containerWidth >= 900) columns = 3;
        if (containerWidth >= 1500) columns = 4;
        return columns;
    }

    image = ({key, photo, index, left, top, margin}) => (
        <Thumbnail
            key={key}
            photo={photo}
            index={index}
            left={left}
            top={top}
            margin={margin}
        />
    );

    get pageType () {
        return this.props.data
            && this.props.data.children
            && this.props.data.children.length > 0
            && this.props.data.children[0].type;
    }

    renderGallery = () => {
        const photos = this.props.data.children.map(photo => ({
            key: photo.name,
            src: require(`../../media/photography/${photo.src}`),
            width: 1,
            height: (photo.meta.height / photo.meta.width),
        }));

        return <Gallery direction="column" photos={photos} columns={this.columns} renderImage={this.image} />;
    }

    renderSubfolder = () => {
        return ( 
            <React.Fragment>
                {map(this.props.data.children, (c) => 
                    <Link to={`/${c.path}`} key={c.path}>
                        {c.name}
                    </Link>
                )}
                
                <Switch>
                    {map(this.props.data.children, (c) => 
                        <RouteCustom
                            path={`/${c.path}`}
                            key={c.path}
                            component={Page}
                            data={c}
                        />
                    )}
                </Switch>
            </React.Fragment>
        );
    }

    // TODO: Create renderSubfolders function similar to renderGallery (currently inline)
    // TODO: Images should route to photo page

    renderPage() {
        switch (this.pageType) {

            case PageTypes.folder:
                return this.renderSubfolder();

            case PageTypes.image:
                return this.renderGallery();

            case PageTypes.text:
            default:
                return null;
        }
    }

    render() {
        if (!this.props.data) {
            return null;
        }

        return (
            <React.Fragment>
            
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{this.props.data.name} | Photography</title>
                </Helmet>

                {this.renderPage()}

            </React.Fragment>
        );
    }

}