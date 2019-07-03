import React from 'react';
import { Alert,Nav,ButtonToolbar,Card,InputGroup, Col,Button,Form} from 'react-bootstrap';
import zxcvbn from 'zxcvbn';
import '../styles/signup-login.scss';
import {Link} from 'react-router-dom';
export default class FormExample extends React.Component {
    
  
    state =
    { 
        validated: false ,
        passwordmatch:true,
        passwordScore:0,
        passwordSuggestions:[],
        passwordweak:false
    };
    
  
    handleSubmit=(event) =>{

      const form = event.currentTarget;

      if (form.checkValidity() === false) 
      {
        event.preventDefault();
        event.stopPropagation();
      }
      else if(form.elements.password.value !== form.elements.confirmPassword.value)
      {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ passwordmatch: false });
      }
      else if(this.state.passwordScore<3)
      {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ passwordweak: true });
      }
      this.setState({ validated: true });
    };

    handlePassword=(e)=>{
        const pwd=e.currentTarget.value;
        const evaluate=zxcvbn(pwd);
        
        this.setState({
            passwordScore:evaluate.score,
            passwordSuggestions:evaluate.feedback.suggestions
        });
    };

    
    render() {
      const { validated } = this.state;

      return (

        <div id="back-ground">

            <Card border="dark"  id='main-content'>

                <Card.Header>
                    <Nav variant="tabs" >
                        <Nav.Item>
                            <Nav.Link ><h4 className='header header-color'><Link to='/signup' style={{ textDecoration: 'none' }}>Sign Up</Link></h4></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active ><h4 className='header'>Log In</h4></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>

                <Card.Body>
                    
                    <Card.Title className='header header-color'>One of us ?</Card.Title>
                    <Card.Text className='header header-color'>
                    Welcome back !
                    </Card.Text>

                    <Form
                    noValidate
                    validated={validated}
                    onSubmit={e => this.handleSubmit(e)}
                    method='POST'
                    action='/login'
                    >
                        

                        <Form.Row>

                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">

                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    name="username"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                    </Form.Control.Feedback>
                                </InputGroup>

                            </Form.Group>

                        </Form.Row>

                        <Form.Row>

                            <Form.Group as={Col} md="12" controlId="validationCustom04">

                              <Form.Control type="Password" placeholder="Password" required name='password' onChange={ e=>this.handlePassword(e)}/>
                               
                              <Form.Control.Feedback type="invalid">
                              Please provide a Password.
                              </Form.Control.Feedback>

                            </Form.Group>

                        </Form.Row>


                        <Form.Row>
                            {
                                this.state.passwordweak && 

                                <Alert  variant='danger' dismissible>
                                    Password too weak!
                                </Alert>
                            }
                        </Form.Row>

                    
                        <Form.Row>
                            {
                                !this.state.passwordmatch && 

                                <Alert  variant='danger' dismissible>
                                    Password and Confirm password fields should match!
                                </Alert>
                            }
                        </Form.Row>

                        
                       
                        
                        
                        

                            <Button variant="outline-primary" size="lg" block type='submit'>
                                Submit
                            </Button>
                            
                            <ButtonToolbar>
                            
                            <Card.Text className='header header-color' style={{ margin:'10px'}}>
                                Or Connect with
                            </Card.Text>
                            
                            <Button variant="primary" size="lg" block>
                                 <i className="social-media-icon fab fa-facebook-square"></i>
                            </Button>
                            <Button variant="danger" size="lg" block>
                                 <i className="social-media-icon fab fa-google"></i>
                            </Button>
                            <Button variant="info" size="lg" block>
                                <i className="social-media-icon fab fa-twitter-square"></i>
                            </Button>

                        </ButtonToolbar>

                    </Form>
                </Card.Body>
            </Card>

        </div>
      );
    }
  }