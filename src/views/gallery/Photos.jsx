import React from "react";
import { Helmet } from "react-helmet";
import Gallery from "react-photo-gallery";

const loadData = (filename) => {
    return import(`../../data/${filename}`)
        .then(module => module.default);
}

class Photos extends React.PureComponent {
    state = {
        data: null,
    }

    componentDidMount() {
        loadData(this.props.filename).then(data => {
            this.setState({
                data: data,
            });
        });
    }

    render() {
        if(!this.state.data) {
            return null;
        }

        const data = this.state.data;

        const content = data.children.map((photo) => {
            console.log(photo);
            let item = {};
            item["src"] = require(`../../media/photography/${photo.src}`);
            item["width"] = 1;
            item["height"] = (photo.meta.height / photo.meta.width);
            return item;
        });
        
        console.log(data);
        console.log(content);

        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{this.state.data.name} | Photography</title>
                </Helmet>

                <Gallery direction="column" photos={content} />

            </React.Fragment>
        );
    }
}

export default Photos;