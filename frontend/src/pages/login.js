import React from 'react';
import {Redirect} from 'react-router-dom';
import { Alert,Nav,ButtonToolbar,Card,InputGroup, Col,Button,Form} from 'react-bootstrap';
import zxcvbn from 'zxcvbn';
import '../styles/login.scss';
import axios from 'axios';
export default class FormExample extends React.Component {
    
  
    state =
    { 
        validated: false ,
        redirect:false,
        invalid:false
    };
    
  
    handleSubmit=(event) =>{

      const form = event.currentTarget;
      event.preventDefault();
      event.stopPropagation();

    if(form.elements.username.value!=='' && form.elements.password.value!=='')

        axios({
            method:'POST',
            url:'/login',
            data:{
                username:form.elements.username.value,
                password:form.elements.password.value
            }
        }).then((response)=>{

            if(response.data.invalid)
            {
                this.setState({ invalid: true });
            }
            else
            {
                this.setState({ redirect: true });
            }
        }).catch(e=>console.log(e));

      
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

        <div id="back-ground-login">

            <Card border="dark"  id='main-content-login' >

                <Card.Header>
                    <Nav variant="tabs" >
                        <Nav.Item>
                            <Nav.Link href='/signup'  ><h4 className='header '>sign up</h4></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active ><h4 className='header'>log in</h4></Nav.Link>
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
                                    Please enter a username.
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
                                this.state.invalid && 

                                <Alert  variant='danger' >
                                    Incorrect Username-Password combination
                                </Alert>
                            }
                        </Form.Row>

                            {this.state.redirect && <Redirect to='/dashboard'/>}
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