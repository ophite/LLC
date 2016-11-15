import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import Checkbox from 'react-toolbox/lib/checkbox';

import styles from "../../../assets/styles/main.scss";

const countriesArray = ['Spain', 'England', 'USA', 'Thailand', 'Tongo', 'Slovenia'];

class PhysicalPersonEditing extends Component {

    state = { name: '', check1: true };

    handleChange = (name, value) => {
        this.setState({...this.state, [name]: value});
    };

    handleMultipleChange = (value) => {
        this.setState({multiple: value});
    };

    render() {
        return (
            <section>
                <h2 className={styles["title--section"]}>Title section</h2>

                <Autocomplete
                    direction="down"
                    label="Choose a country (choose only one)"
                    multiple={false}
                    onChange={this.handleMultipleChange}
                    source={countriesArray}
                />

                <Input type='text' label='Name' name='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />

                <Input type='text' label='Name' name='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />

                <Autocomplete
                    direction="down"
                    label="Choose a country (choose only one)"
                    multiple={false}
                    onChange={this.handleMultipleChange}
                    source={countriesArray}
                    value={this.state.simple}
                />

                <Checkbox
                    checked={this.state.check1}
                    label="Checked option"
                    onChange={this.handleChange.bind(this, 'check1')}
                />
            
            </section>
        );
    }
}

export default PhysicalPersonEditing;