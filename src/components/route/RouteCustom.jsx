import React from 'react';
import { Route } from 'react-router-dom';

const loadData = (filename) => {
    return import(`../../data/${filename}`)
        .then(module => module.default);
}

export default class RouteCustom extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
        };
    }

    componentDidMount() {
       if (this.props.filename) {
            loadData(this.props.filename)
                .then(data => this.setState({
                    data
                }));
       } 
    }

    render() {
        const Component = this.props.component;
        return (
            <Route>
                <Component data={this.state.data} />
            </Route>
        );
    }
}