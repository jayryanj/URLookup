import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/Results';
import { 
  Container, 
  Navbar, 
  NavbarBrand,
  Nav,
  Row, 
  Col, 
  Form, 
  InputGroup, 
  Input, 
  Button, 
  Spinner,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';
import Results from './components/Results';
import laptop from './resources/laptop.png';
const axios = require('axios');
const validURL = require('valid-url');


class App extends Component {

  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();

    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.render = this.render.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.toggle = this.toggle.bind(this);


    // Used for the results card to prevent it from changing when a new submissions is entered
    this.submittedUrl = "";

    this.state = {
        url: '', // TODO: set to '' after testing
        results: null, // TODO: Change to null after testing
        isLoading: false,
        isValidUrl: true,
        isError: false,
        errorMessage: undefined
    };
  }

  async callAPI() {
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
    
    try {
      let response = await axios.post('http://127.0.0.1:5000/api/lookup/', data, config);
      this.setState({results: response.data});
  
      // Trigger slide animation after loading
      wrapper.classList.toggle("results-loaded");
    } catch(error) {
      this.setState({isError: true});
      this.setState({results: null});
      console.log(error)
    }

    this.setState({isLoading: false});

  }

  async onSubmit(e) {
    e.preventDefault();

    if(validURL.isWebUri(this.state.url)){
      this.callAPI();

    } else {
      this.setState({isValidUrl: false});
    }
  
  }

  onChangeUrl(e) {
      this.setState({url: e.target.value});
      this.setState({isValidUrl: true})
  }

  toggle(e) {
    this.setState({
      isError: !this.state.isError
    })
  }

  render() {
    let testResults = {
      verdict: {
        malicious: true,
        score: 100,
        categories: ["malware", "phishing"]
      }
    }

    // Results logic
    let resultsCard;

    
    if(this.state.results == null && !this.state.isLoading) {
      resultsCard = <img alt='laptop-graphic' className='laptop-image' src={laptop} />
    } else {
      if(this.state.isLoading) {
        resultsCard = <Spinner className="results-loading" style={{ width: '8rem', height: '8rem' }} /> 
      } else {
        resultsCard = <Results url={this.submittedUrl} results={this.state.results} />
      }
    } 


    return (
      <div className="App">
        <Navbar>
          <NavbarBrand href="/" className="mr-auto">
            <h1>URLookup</h1>
          </NavbarBrand>
          <Nav pullRight>

          </Nav>
        </Navbar>

        <Modal isOpen={this.state.isError} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>URL Not Found</ModalHeader>
          <ModalBody>
            The URL that you submitted was not found and could not be processed. There may be an error with the URL, or the resource may no longer be available.
          </ModalBody>
        </Modal>

          <Row>

            <Col lg className='column1'>
                <Container className="description">
                  <h2>Check a URL for threats</h2>
                  <Container>
                    <p>
                      The web is a dangerous landscape. Websites can pose a major security threat for unsuspecting victims. Submit a suspicious URL, and we'll take a look by scanning for any threats. <br/><br/>Note: Do not submit any URLs that contain sensitive information.
                    </p>
                  </Container>
                </Container>

                <Container className="inputContainer">
                    <Form onSubmit={this.onSubmit}>
                        {
                          this.state.isValidUrl ?
                          <InputGroup>
                            <Input onChange={this.onChangeUrl} bsSize="lg" placeholder="https://www.example.com/..." />
                          </InputGroup>
                          :
                          <InputGroup>
                            <Input invalid onChange={this.onChangeUrl} bsSize="lg" placeholder="https://www.example.com/..." />
                            
                          </InputGroup>
                        }
                        {
                          this.state.isLoading ? 
                            <Button disabled className="pull-left inputButton" size="lg">
                              Loading...
                            </Button>
                          : 
                            <Button type="submit" className="pull-left inputButton active-button" size="lg">
                              Submit
                            </Button>
                        }
                        
                    </Form>
                </Container>

            </Col>

            <Col lg className='column2'>
              <Container className="results-container">
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
