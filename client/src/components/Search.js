import React, { Component } from 'react';
import { Form, Input, Container, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        };
    }
    render() {
        return (
            <div className="Search">
                <Container>
                    <InputGroup classname="inputBar">
                        <InputGroupAddon addonType="append">
                            <InputGroupText>Search</InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="URL to check..." />
                    </InputGroup>
                </Container>
            </div>
        );
    }
}

export default Search;