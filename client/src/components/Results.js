// Useless for now

import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardImg } from 'reactstrap';

class Results extends Component {

    constructor(props) {
        super(props);

        this.render = this.render.bind(this);

        console.log(props.results);

        this.state = {
            malicious: props.results.verdict.malicious,
            threat_score: props.results.verdict.score,
            categories: props.results.verdict.categories
        };

    }

    render() {

        return(
            <div>
                { !this.state.malicious ?
                    <Card className="Results" body>
                        <CardImg className="resultsGraphic" top width="10%" src={require("../resources/checkmark1.png")}/>
                        <CardBody>
                            <h2>Looks Safe!</h2>
                            <p style={{textAlign: "center"}}>No threats have been detected.</p>
                            <div className="resultStats">
                                <h4 className="results-h4">Submitted URL: </h4>
                                <p className="results-p">
                                    {this.props.url}
                                </p>
                                <h4 className='results-h4'>Threat Score:</h4>
                                <p className="results-p results-threat-score">
                                    {this.state.threat_score} / 100
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                :
                    <Card className="Results" body>
                        <CardImg className="resultsGraphic" top width="10%" src={require("../resources/warningmark2.png")} />
                        <CardBody>
                            <h2>Looks Suspicious!</h2>
                            <p style={{textAlign: "center"}}>Possible threats have been detected with this submission</p>
                            <div className="resultStats">
                                <h4 className="results-h4">Submitted URL: </h4>
                                <p className="results-p">
                                    {this.props.url}
                                </p>

                                <h4 className='results-h4'>Threat Score: </h4>
                                <p className="results-p results-threat-score">
                                    {this.state.threat_score} / 100
                                </p>

                                <h4 className='results-h4'>Threat Categories:</h4>
                                <ul className='results-p'>
                                    {
                                        this.state.categories.map(function(type) {
                                            return <li>{type}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            

                        </CardBody>
                    </Card>
                }
            </div>
        );
    }
}

export default Results;