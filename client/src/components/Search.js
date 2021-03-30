// Useless for now until Redux is implemented

import React, { Component } from 'react';
import { Input, Container, Form, InputGroup, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            url: '',
            isLoading = false,
            isDone = false
        };
    }

    onSubmit(e) {
        e.preventDefault();

        // For Testing
        console.log(`Form submitted.`);
        console.log(`URL: ${this.state.url}`);
    }

    onChangeUrl(e) {
        this.setState({url: e.target.value});
    }

    render() {
        return (
            <div className="Search">
            </div>
        );
    }
}

export default Search;