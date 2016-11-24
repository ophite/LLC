import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { GOLDEN_CUSTOM_ATTRIBUTE } from '../../../constants/golden.constant';


class GoldenComponentPage extends Component {

    componentDidMount() {
        const { uuid } = this.props;
        const element = ReactDOM.findDOMNode(this.goldenWindow);
        element.setAttribute(GOLDEN_CUSTOM_ATTRIBUTE, uuid);
    }

    render() {
        return (
            <div ref={(ref) => this.goldenWindow = ref}>
            </div>
        );
    }
}

export default GoldenComponentPage;
