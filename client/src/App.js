import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/Results';
import { 
  Container, 
  Navbar, 
  NavbarBrand,
  Nav,
  NavItem, 
  Row, 
  Col, 
  Form, 
  InputGroup, 
  Input, 
  Button, 
  Spinner,
} from 'reactstrap';
import Results from './components/Results';
const axios = require('axios');

class App extends Component {

  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();

    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.render = this.render.bind(this);

    // TEST RESULTS
    let testResults = {
      verdict: {
        malicious: false,
        score: 100,
        categories: ["malware"]
      }
    }

    // Used for the results card to prevent it from changing when a new submissions is entered
    this.submittedUrl = "";

    this.state = {
        url: '',
        results: null, // TODO: Remove after testing
        isLoading: false,
    };
}

  async onSubmit(e) {
    e.preventDefault();
    const wrapper = this.wrapperRef.current;
    let data = {
      "url": this.state.url
    }

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    this.setState({isLoading: true});

    this.submittedUrl = this.state.url;

    // For Testing
    console.log(`Form submitted.`);
    console.log(`URL: ${this.state.url}`);
    
    
    let response = await axios.post('http://localhost:5000/api/lookup/', data, config);

    this.setState({results: response.data});
    this.setState({isLoading: false});

    // Trigger slide animation after loading
    wrapper.classList.toggle("results-loaded");
  }

  onChangeUrl(e) {
      this.setState({url: e.target.value});
  }

  render() {

    // Results logic
    let resultsCard;

    if(this.state.results == null && !this.state.isLoading) {
      resultsCard = <p>No results</p>
    } else {
      if(this.state.isLoading) {
        resultsCard = <Spinner className="resultsLoading" style={{ width: '3rem', height: '3rem' }} /> 
      } else {
        resultsCard = <Results url={this.submittedUrl} results={this.state.results} />
      }
    } 


    return (
      <div className="App">
        <Navbar>
          <NavbarBrand href="/" className="mr-auto">
            <h1>URLooker</h1>
          </NavbarBrand>
          <Nav pullRight>

          </Nav>
        </Navbar>

          <Row>

            <Col>
                <Container className="description">
                  <h2>Check a URL for threats</h2>
                  <Container>
                    <p>
                      The web is a dangerous landscape. Websites can pose a major security threat for unsuspecting victims. Submit a suspicious URL, and we'll take a look by scanning for any threats. <br/><br/>Note: Do not submit any URLs that contain sensitive information 
                    </p>
                  </Container>
                </Container>

                <Container className="inputContainer">
                    <Form onSubmit={this.onSubmit}>
                        <InputGroup>
                            <Input onChange={this.onChangeUrl} bsSize="lg" placeholder="https://www.example.com/..." />
                        </InputGroup>
                        {
                          this.state.isLoading ? 
                            <Spinner className="buttonLoading" style={{ width: '3rem', height: '3rem' }} /> 
                          : 
                            <Button type="submit" className="pull-left inputButton" size="lg">
                              Submit
                            </Button>
                        }
                        
                    </Form>
                </Container>

            </Col>

            <Col>
              <Container>
                <div ref={this.wrapperRef}>
                  {resultsCard}
                </div>
              </Container>
            </Col>

          </Row>
      </div>
    );
  }
}

export default App;
